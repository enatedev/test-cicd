import { useEffect } from "preact/hooks";
import $ from "jquery";
import Velocity from "velocity-animate";
import Styles from "./spinnerComponent.module.scss";
import FlagLeft from "../../../public/flag-left.png";
import FlagRight from "../../../public/flag-right.png";
import Brand from "../../../public/brand.png";
import { I18n } from "react-redux-i18n";

const SpinnerComponent = (props: any) => {
  return (
    <div className={Styles.BackgroundLoading}>
      <div className={Styles.LoadingSpinner}></div>
    </div>
  );
};

export default SpinnerComponent;
