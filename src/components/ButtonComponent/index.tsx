import React from "react";
import { Button } from "@mui/material";
import Styles from "./buttonComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

const ButtonComponent = (props: any) => {
  const { title, value, active, handleChangeButton } = props;
  return (
    <Button
      onClick={() => {
        handleChangeButton(value);
      }}
      startIcon={
        (value === "odd_live" && <TripOriginIcon />) ||
        (value === "like" && <StarOutlineRoundedIcon />)
      }
      className={clsx(
        Styles.ButtonContainer,
        GlobalStyles.FontMontserrat,
        active === value
          ? [GlobalStyles.TextLight, GlobalStyles.BackgroundRed]
          : [GlobalStyles.TextDark, GlobalStyles.BackgroundLight]
      )}
      variant="text"
    >
      {title}
    </Button>
  );
};

export default React.memo(ButtonComponent);
