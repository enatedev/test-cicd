import clsx from "clsx";
import Styles from "./noDataComponent.module.scss";
import Global from "../../../global.module.scss";
import { setLoading } from "../../../src/redux/actions/loadingAction";
import { store } from "../../redux/store";
import { I18n } from "react-redux-i18n";

const NoDataElement = () => {
  store.dispatch(setLoading(false));
  return (
    <div className={clsx(Styles.NoData, Global.TextBaseDark)}>
      {I18n.t("no_data")}
    </div>
  );
};

export default NoDataElement;
