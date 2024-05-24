import React from "react";
import { Box} from "@mui/material";
import Styles from "./flagFixtureComponent.module.scss";
import YellowStar from "../../../public/yellow_star.png";
import {RESOURCE_URL} from "../../utils/contants";


const FlagFixtureComponent = (props: any) => {
  const { classFlag, classStar, handleLikeFixture, background } = props;

  return (
    <Box onClick={handleLikeFixture} className={Styles.FlagFixtureContainer}>
      <img src={background} />
    </Box>
  );
};

export default React.memo(FlagFixtureComponent);
