import React, { useState } from "react";
import { Card, Box, Grid, Paper, Typography, Divider } from "@mui/material";
import Styles from "./fixtureComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import { I18n } from "react-redux-i18n";
import DetailedAnalysis from "../DetailedAnalysisComponent";
import BetNowComponent from "../BetNowComponent";
import { oddsDisplayType } from "../../redux/reducers/initialState";
import { ODDS_DISPLAY_TYPE } from "../../utils/contants";
import { useSelector } from "react-redux";

const OddValueComponent = (props: any) => {
  const { data } = props;
  const oddsBetDisplayType = useSelector((state: any) => state.oddsDisplayTypeReducer);

  const displayOddsValueByType = (value: any) => {
    switch (oddsBetDisplayType) {
      case ODDS_DISPLAY_TYPE[3].name: // MAL
        return value;
      default:
        return parseFloat(value + 1).toFixed(2);
    }
  }

  return (
    <Box>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <Card className={clsx(Styles.FixtureOddValueItem)}>
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight600,
                GlobalStyles.TextDark
              )}
            >
              {item.value}
            </Typography>
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight600,
                GlobalStyles.TextDark
              )}
            >
              {displayOddsValueByType(item.odd)}
            </Typography>
          </Card>
        ))}
    </Box>
  );
};

const TeamScoreComponent = (props: any) => {
  return (
    <Box className={clsx(Styles.FixtureItemBox)}>
      <Box className={Styles.DisplayFlexCenter}>
        <img
          width="13"
          height="15"
          src="https://media.api-sports.io/football/teams/822.png"
        ></img>
        <Typography
          className={clsx(
            GlobalStyles.FontMontserrat,
            GlobalStyles.FontSizeSmall,
            GlobalStyles.FontWeight700
          )}
        >
          Arsenal
        </Typography>
      </Box>
      <Typography
        className={clsx(
          GlobalStyles.FontMontserrat,
          GlobalStyles.FontSizeSmall,
          GlobalStyles.FontWeight700,
          Styles.FixtureItemScore
        )}
      >
        1
      </Typography>
    </Box>
  );
};

const GridFixtureComponent = (props: any) => {
  const { data } = props;

  return (
    <>
      <Grid
        className={clsx(Styles.GridContainer, GlobalStyles.FontMontserrat)}
        container
      >
        <Grid item xs={0.5} className={Styles.FixtureGrid}>
          <Box className={Styles.PaddingTop20}>
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight700
              )}
            >
              H1
            </Typography>
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight700
              )}
            >
              45'
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1.75} className={Styles.FixtureGrid}>
          <Box className={Styles.PaddingTop10}>
            <TeamScoreComponent />
            <TeamScoreComponent />
          </Box>
        </Grid>
        <Grid item xs={4} className={Styles.FixtureGrid}>
          <Box className={Styles.FixtureItemGrid}>
            <OddValueComponent data={data.dataHDC} />
            <OddValueComponent data={data.dataUo} />
            <OddValueComponent data={data.data1x2} />
          </Box>
          <Divider />
          <Box className={Styles.FixtureItemGrid}>
            <OddValueComponent data={data.dataHDC} />
            <OddValueComponent data={data.dataUo} />
            <OddValueComponent data={data.data1x2} />
          </Box>
        </Grid>
        <Grid item xs={4} className={Styles.FixtureGrid}>
          <Box className={Styles.FixtureItemGrid}>
            <OddValueComponent data={data.dataHDC} />
            <OddValueComponent data={data.dataUo} />
            <OddValueComponent data={data.data1x2} />
          </Box>
          <Divider />
          <Box className={Styles.FixtureItemGrid}>
            <OddValueComponent data={data.dataHDC} />
            <OddValueComponent data={data.dataUo} />
            <OddValueComponent data={data.data1x2} />
          </Box>
        </Grid>
        <Grid item xs={1.75} className={Styles.FixtureGrid}>
          <Box
            className={clsx(Styles.FixtureItemGrid, Styles.AlignItemFlexCenter)}
          >
             
          </Box>
          <Box
            className={clsx(Styles.FixtureItemGrid, Styles.AlignItemFlexCenter)}
          >
            <BetNowComponent />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const FlagFixtureComponent = (props: any) => {
  return (
    <Box className={clsx(Styles.Flag, Styles.RedFlag)}>
      <Box className={clsx(Styles.Star, Styles.YellowStar)}></Box>
    </Box>
  );
};

const FixtureComponent = (props: any) => {
  const [activeButton, setActiveButton] = useState(false);

  const { fixture } = props;
  const data = {
    data1x2: [
      {
        value: 0.5,
        odd: 0.91,
      },
      {
        value: 0.5,
        odd: 0.91,
      },
      {
        value: 0.5,
        odd: 0.91,
      },
    ],
    dataHDC: [
      {
        value: 0.5,
        odd: 0.91,
      },
      {
        value: 0.5,
        odd: 0.91,
      },
    ],
    dataUo: [
      {
        value: 0.5,
        odd: 0.91,
      },
      {
        value: 0.5,
        odd: 0.91,
      },
    ],
  };

  return (
    <Paper className={Styles.FixtureContainer}>
      <GridFixtureComponent data={data} fixture={fixture} />
      <FlagFixtureComponent />
      <Box className={Styles.FixtureFooter}>
        <DetailedAnalysis  active={activeButton} />
        <Box className={Styles.FixtureFooterCenter}>
          <Typography
            className={clsx(
              GlobalStyles.TextLight,
              GlobalStyles.FontMontserrat,
              GlobalStyles.FontSizeSmall
            )}
          >
           {I18n.t("other_bet")}
          </Typography>
        </Box>
        <Box></Box>
      </Box>
      
    </Paper>
  );
};

export default React.memo(FixtureComponent);
