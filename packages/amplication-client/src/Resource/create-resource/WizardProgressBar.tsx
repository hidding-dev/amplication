import React, { useContext } from "react";
import "./CreateServiceWizard.scss";
import { AppContext } from "../../context/appContext";
import { WizardProgressBarInterface } from "./wizardResourceSchema";
import { Icon } from "@amplication/design-system";
import "./wizardProgressBar.scss";
import { FormikProps } from "formik";

interface Props {
  wizardProgressBar: WizardProgressBarInterface[];
  activePageIndex: number;
  formik: FormikProps<{ [key: string]: any }>;
}

const CLASS_NAME = "wizard-progress-bar";

const ProgressBarItem: React.FC<{
  title: string;
  isValid: boolean;
  disabled: boolean;
}> = ({ title, isValid, disabled }) => (
  <div className={`${CLASS_NAME}__item_container`}>
    <div className={`${CLASS_NAME}__item_icon`}>
      {isValid ? (
        <Icon
          icon="check"
          className={`${
            disabled ? `${CLASS_NAME}__disabled` : ""
          } wizard_check`}
        />
      ) : (
        <Icon
          icon="circle"
          className={`${
            disabled ? `${CLASS_NAME}__disabled` : ""
          } wizard_loading`}
        />
      )}
    </div>
    <div
      className={`${
        disabled ? `${CLASS_NAME}__disabled` : ""
      } ${CLASS_NAME}__item_title`}
    >
      {title}
    </div>
  </div>
);

const WizardProgressBar: React.FC<Props> = ({
  wizardProgressBar,
  activePageIndex,
  formik,
}) => {
  return (
    <div className={`${CLASS_NAME}__container`}>
      {wizardProgressBar.map((item: WizardProgressBarInterface, index) => {
        const enabledPage = !item.activePages.some(
          (page: number) => page <= activePageIndex
        );
        const enabledPage2 = !item.activePages.every(
          (page: number) => page <= activePageIndex
        );
        console.log(item.title, enabledPage2);
        return (
          <>
            <ProgressBarItem
              key={item.title}
              title={item.title}
              isValid={formik.isValid && !!enabledPage2}
              disabled={enabledPage}
            />
            {index < wizardProgressBar.length - 1 && (
              <div
                key={item.title}
                className={`${CLASS_NAME}__item_space`}
              ></div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default WizardProgressBar;
