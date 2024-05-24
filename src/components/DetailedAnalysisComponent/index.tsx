import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import Styles from "./DetailedAnalysis.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import { I18n } from "react-redux-i18n";
import ModalComponent from "../ModalComponent";

const DetailedAnalysis = (props: any) => {
  const { fixture } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Button className={Styles.FixtureFooterLeft} onClick={handleOpen}>
      <img src="https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/images/ot-microicon.svg" />
      <Typography
        className={clsx(
          GlobalStyles.FontMontserrat,
          GlobalStyles.FontSizeSmall
        )}
      >
       {I18n.t("detailed_analysis")}
      </Typography>
      <ModalComponent open={open} handleClose={handleClose} fixture={fixture} />
    </Button>
  );
};

export default React.memo(DetailedAnalysis);
