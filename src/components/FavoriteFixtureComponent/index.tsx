import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Styles from "./favoriteFixture.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import { I18n } from "react-redux-i18n";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TeamScoreComponent from "../TeamScoreComponent";
import DetailedAnalysisComponent from "../DetailedAnalysisComponent";
import FlagFixtureComponent from "../FlagFixtureComponent";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import BetNowComponent from "../BetNowComponent";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  FAVORITE_RED_ICON_URL,
  FAVORITE_BLACK_ICON_URL,
} from "../../utils/contants";
import { setLoading } from "../../../src/redux/actions/loadingAction";
import { store } from "../../redux/store";

const NotYetFixtureComponent = (props: any) => {
  const { fixture } = props;
  const modifiedDate = moment
    .unix(fixture.matchTime)
    .format("DD.MM.YYYY HH:mm");

  return (
    <Box>
      {" "}
      <Typography
        className={clsx(
          GlobalStyles.FontWeight600,
          GlobalStyles.FontSizeMedium,
          GlobalStyles.TextRed
        )}
      >
        {I18n.t("not_yet_match")}
      </Typography>
      <Typography
        className={clsx(
          GlobalStyles.TextDark,
          GlobalStyles.FontWeight600,
          GlobalStyles.FontSizeSmall
        )}
      >
        {modifiedDate}
      </Typography>
    </Box>
  );
};

const EndBoxFixtureComponent = (props: any) => {
  const { fixture } = props;
  const modifiedDate = moment
    .unix(fixture.matchTime)
    .format("DD.MM.YYYY HH:mm");

  return (
    <Box>
      {" "}
      <CheckCircleOutlineIcon fontSize="large" />
      <Typography
        className={clsx(
          GlobalStyles.TextDark,
          GlobalStyles.FontWeight600,
          GlobalStyles.FontSizeSmall
        )}
      >
        {I18n.t("end")}
      </Typography>
      <Typography
        className={clsx(
          GlobalStyles.TextDark,
          GlobalStyles.FontWeight600,
          GlobalStyles.FontSizeSmall
        )}
      >
        {modifiedDate}
      </Typography>
    </Box>
  );
};

const LiveBoxFixtureComponent = (props: any) => {
  const { fixture } = props;
  const [textTime, setTextTime] = useState("H1");
  switch (fixture.status) {
    case 1:
      setTextTime("H1");
      break;
    case 2:
      setTextTime("Break time");
      break;
    case 3:
      setTextTime("H2");
      break;
    case 4:
      setTextTime("Extra time");
      break;
    case 5:
      setTextTime("Penalty");
      break;
    default:
      break;
  }
  return (
    <Box className={Styles.LiveBoxFixture}>
      <Box
        className={clsx(Styles.LiveButtonBoxFixture, GlobalStyles.TextLight)}
      >
        <RadioButtonCheckedIcon />
        <Typography
          className={clsx(
            GlobalStyles.TextLight,
            GlobalStyles.FontMontserrat,
            GlobalStyles.FontSizeSmall,
            GlobalStyles.FontWeight700
          )}
        >
          {I18n.t("live")}
        </Typography>
      </Box>
      <Typography
        className={clsx(
          GlobalStyles.TextDark,
          GlobalStyles.FontMontserrat,
          GlobalStyles.FontSizeSmall,
          GlobalStyles.FontWeight700
        )}
      >
        {textTime}
      </Typography>
      <Typography
        className={clsx(
          GlobalStyles.TextRed,
          GlobalStyles.FontMontserrat,
          GlobalStyles.FontSizeSmall
        )}
      >
        {fixture.extraExplain.minute}'
      </Typography>
    </Box>
  );
};

const FavoriteFixtureComponent = (props: any) => {
  const {
    handleClickHistory,
    fixture,
    setHistoryFixture,
    setIdTeam,
    league,
    globalFixtures,
  } = props;
  const isLoading = useSelector((state: any) => state.loadingReducer.loading);

  useEffect(() => {
    store.dispatch(setLoading(false));
  }, [isLoading]);

  return (
    <Paper className={Styles.FixtureContainer}>
      <Box className={Styles.FixtureFooter}>
        <Box className={Styles.BoxLeague}>
          <img width={16} height={16} src={league.logo} />
          <Typography
            className={clsx(
              GlobalStyles.TextDark,
              GlobalStyles.FontMontserrat,
              GlobalStyles.FontSizeSmall,
              GlobalStyles.FontWeight600
            )}
          >
            {league.name}
          </Typography>
        </Box>
        <Box className={Styles.FixtureFooterCenter}>
          <Typography
            className={clsx(
              GlobalStyles.TextDark,
              GlobalStyles.FontMontserrat,
              GlobalStyles.FontSizeSmall
            )}
          >
            {I18n.t("time_show")}
          </Typography>
        </Box>
        <Box
          className={clsx(Styles.FixtureFooterRight, GlobalStyles.TextLight)}
        >
          <CollectionsBookmarkIcon />
          <Typography
          // onClick={() => {
          //   handleClickHistory("history_league");
          // }}
          >
            {I18n.t("history")}
          </Typography>
        </Box>
      </Box>
      <Box className={Styles.FixtureBody}>
        <Grid className={Styles.FixtureGridContainer} container>
          <Grid
            className={clsx(
              Styles.FixtureGridItem,
              Styles.BorderBottomLeftRadius
            )}
            xs={3}
            item
          >
            {fixture.status === 0 && (
              <NotYetFixtureComponent fixture={fixture} />
            )}
            {fixture.status === -1 && (
              <EndBoxFixtureComponent fixture={fixture} />
            )}
            {fixture.status === (1 || 2 || 3 || 4 || 5) && (
              <LiveBoxFixtureComponent fixture={fixture} />
            )}
          </Grid>
          <Grid className={Styles.FixtureGridItem} xs={3} item>
            <Box style={{ width: "100%" }}>
              <TeamScoreComponent
                setHistoryFixture={setHistoryFixture}
                handleClickHistory={handleClickHistory}
                fixture={fixture}
                team={fixture.homeName}
                score={fixture.homeScore}
                teamId={fixture.homeId}
                setIdTeam={setIdTeam}
                isHome={true}
              />
              <TeamScoreComponent
                setHistoryFixture={setHistoryFixture}
                handleClickHistory={handleClickHistory}
                fixture={fixture}
                team={fixture.awayName}
                score={fixture.awayScore}
                teamId={fixture.awayId}
                setIdTeam={setIdTeam}
                isHome={false}
              />
            </Box>
          </Grid>
          <Grid className={clsx(Styles.FixtureGridItem)} xs={3} item>
            <Box className={Styles.DisplayFlexCenter}>
              {/* <img
                width="50"
                height="60"
                src="https://media.api-sports.io/football/teams/822.png"
              ></img> */}
              <Box className={Styles.BoxTextFlexCenter}>
                <Typography
                  className={clsx(
                    Styles.TextFlexCenter,
                    GlobalStyles.TextRed,
                    GlobalStyles.FontWeight600,
                    GlobalStyles.FontSizeSmall
                  )}
                >
                  {fixture.homeScore > fixture.awayScore && fixture.homeName}
                  {fixture.homeScore < fixture.awayScore && fixture.awayName}
                </Typography>
                {fixture.homeScore !== fixture.awayScore ? (
                  <Typography
                    className={clsx(
                      Styles.TextFlexCenter,
                      GlobalStyles.TextDark,
                      GlobalStyles.FontWeight600,
                      GlobalStyles.FontSizeSmall
                    )}
                  >
                    {I18n.t("go_next_round")}
                  </Typography>
                ) : (
                  <Typography
                    className={clsx(
                      Styles.TextFlexCenter,
                      GlobalStyles.TextDark,
                      GlobalStyles.FontWeight600,
                      GlobalStyles.FontSizeSmall
                    )}
                  >
                    {fixture.status === -1 && I18n.t("team_draw")}
                  </Typography>
                )}
                <DetailedAnalysisComponent fixture={globalFixtures} />
              </Box>
            </Box>
          </Grid>
          <Grid
            className={clsx(
              Styles.FixtureGridItem,
              Styles.BorderRightGrayColor,
              Styles.BorderBottomRightRadius
            )}
            xs={3}
            item
          >
            <Box>
              <BetNowComponent />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <FlagFixtureComponent
        classFlag={Styles.ClassFlag}
        classStar={Styles.ClassStar}
        background={
          fixture.isLike ? FAVORITE_RED_ICON_URL : FAVORITE_BLACK_ICON_URL
        }
      />
    </Paper>
  );
};

export default React.memo(FavoriteFixtureComponent);
