import React, { useEffect } from "react";
import { Box, Typography, Paper, Collapse, Grid } from "@mui/material";
import Styles from "./historyFixtureComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import PushPinSharpIcon from "@mui/icons-material/PushPinSharp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import TeamScoreComponent from "../TeamScoreComponent";
import DetailedAnalysisComponent from "../DetailedAnalysisComponent";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { I18n } from "react-redux-i18n";
import { LEAGUES } from "../../utils/contants";
import moment from "moment";
import BetNowComponent from "../BetNowComponent";
import { setLoading } from "../../../src/redux/actions/loadingAction";
import { store } from "../../redux/store";
import { useSelector } from "react-redux";
import NoDataElement from "../NoDataComponent";

export const HistoryBodyFixtureComponent = (props: any) => {
  const { preActive, fixtures, league, home, h2h, historyFixture } = props;
  const [open, setOpen] = React.useState(true);

  const RenderFixtures = (props) => {
    const { fixtures } = props;
    return fixtures.map((fixture) => {
      let homeName,
        awayName,
        homeScore,
        awayScore,
        result,
        backgroundColor,
        resultForAway,
        backgroundColorForAway;

      fixture = fixture.split(",");
      const fixtureTime = moment.unix(fixture[3]).format("DD/MM/YYYY HH:mm");
      if (h2h) {
        homeName = fixture[4];
        awayName = fixture[6];
        homeScore = fixture[8];
        awayScore = fixture[9];

        if (home === fixture[5]) {
          resultForAway =
            homeScore > awayScore ? "W" : homeScore < awayScore ? "L" : "D";
          backgroundColorForAway =
            homeScore > awayScore
              ? "rgb(5, 168, 64)"
              : homeScore < awayScore
              ? "rgb(220, 1, 0)"
              : "rgb(243, 160, 0)";
        } else {
          resultForAway =
            awayScore > homeScore ? "W" : awayScore < homeScore ? "L" : "D";
          backgroundColorForAway =
            awayScore > homeScore
              ? "rgb(5, 168, 64)"
              : awayScore < homeScore
              ? "rgb(220, 1, 0)"
              : "rgb(243, 160, 0)";
        }
      } else {
        if (home === fixture[5]) {
          homeName = fixture[4];
          awayName = fixture[6];
          homeScore = fixture[8];
          awayScore = fixture[9];
        } else if (home === fixture[7]) {
          homeName = fixture[4];
          awayName = fixture[6];
          homeScore = fixture[8];
          awayScore = fixture[9];

          resultForAway =
            awayScore > homeScore ? "W" : awayScore < homeScore ? "L" : "D";
          backgroundColorForAway =
            awayScore > homeScore
              ? "rgb(5, 168, 64)"
              : awayScore < homeScore
              ? "rgb(220, 1, 0)"
              : "rgb(243, 160, 0)";
        }
      }

      result =
        resultForAway == undefined
          ? homeScore > awayScore
            ? "w"
            : homeScore < awayScore
            ? "L"
            : "D"
          : resultForAway;
      backgroundColor =
        backgroundColorForAway == undefined
          ? homeScore > awayScore
            ? "rgb(5, 168, 64)"
            : homeScore < awayScore
            ? "rgb(220, 1, 0)"
            : "rgb(243, 160, 0)"
          : backgroundColorForAway;
      return (
        <Grid className={Styles.BoxCollapse} container>
          <Grid xs={0.5} item>
            <StarOutlineRoundedIcon />
          </Grid>
          <Grid xs={2.5} item>
            <Box className={Styles.AlignItemCenter}>
              <Typography
                className={clsx(
                  GlobalStyles.FontMontserrat,
                  GlobalStyles.FontSizeSmall,
                  GlobalStyles.FontWeight600,
                  GlobalStyles.TextDark
                )}
              >
                {fixtureTime}
              </Typography>
            </Box>
            {/* <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight600
              )}
              sx={{textAlign: 'center'}}
            >
              AET
            </Typography> */}
          </Grid>
          <Grid xs={7} item>
            <Box className={Styles.BoxTeamScore}>
              <TeamScoreComponent
                team={homeName}
                score={homeScore}
                teamId={home}
                fixtureTeamId={fixture[5]}
              />
              <Box style={{ height: "10px" }}></Box>
              <TeamScoreComponent
                team={awayName}
                score={awayScore}
                teamId={home}
                fixtureTeamId={fixture[7]}
              />
            </Box>
          </Grid>
          <Grid xs={2} item sx={{ display: "flex", justifyContent: "end" }}>
            {preActive === "finished" && (
              <HistoryFixtureResultComponent
                backgroundColor={backgroundColor}
                result={result}
              />
            )}
          </Grid>
        </Grid>
      );
    });
  };

  const handleOpenCollapse = () => {
    setOpen(!open);
  };

  const leageName = LEAGUES.find((entry) => entry.id === league)
    ? LEAGUES.find((entry) => entry.id === league).name
    : "";

  const HeaderHistoryFixtureComponent = (props: any) => {
    return (
      <Box
        onClick={handleOpenCollapse}
        className={Styles.HistoryBodyFixtureHeader}
      >
        {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        <Typography
          className={clsx(
            GlobalStyles.FontMontserrat,
            GlobalStyles.FontSizeSmall,
            GlobalStyles.FontWeight600,
            GlobalStyles.TextDark
          )}
        >
          {leageName}
        </Typography>
      </Box>
    );
  };

  const HeaderHistoryTeamFixtureComponent = (props: any) => {
    return (
      <Box className={Styles.BoxWrapperHeader}>
        <Grid className={Styles.HeaderGrid} container>
          <Grid item>
            <Box
              onClick={handleOpenCollapse}
              className={Styles.HeaderCountryLeague}
            >
              {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              <img
                height={12}
                width={20}
                src={historyFixture.league.countryLogo}
              />
              <Typography
                className={clsx(
                  GlobalStyles.FontMontserrat,
                  GlobalStyles.FontSizeSmall,
                  GlobalStyles.FontWeight600,
                  GlobalStyles.TextDark
                )}
              >
                {historyFixture.league.country}:
              </Typography>
              <Typography
                className={clsx(
                  GlobalStyles.FontMontserrat,
                  GlobalStyles.FontSizeSmall,
                  GlobalStyles.FontWeight600,
                  GlobalStyles.TextDark
                )}
              >
                {historyFixture.league.name}
              </Typography>
            </Box>
          </Grid>
          <Grid
            className={clsx(GlobalStyles.TextLight, Styles.HeaderGridItem)}
            item
          >
            <CollectionsBookmarkIcon />
            <Typography>{I18n.t("history")}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box className={Styles.HistoryBodyFixture}>
      {preActive === "finished" || preActive === "odd_live" ? (
        <HeaderHistoryFixtureComponent />
      ) : (
        <HeaderHistoryTeamFixtureComponent />
      )}
      <Collapse in={open} timeout="auto" unmountOnExit>
        {fixtures ? <RenderFixtures fixtures={fixtures} /> : ""}
      </Collapse>
    </Box>
  );
};

const HistoryFixtureResultComponent = (props: any) => {
  const { backgroundColor, result } = props;

  return (
    <div
      className={Styles.FixtureResult}
      style={{ backgroundColor: backgroundColor }}
    >
      {result}
    </div>
  );
};

const HistoryFixtureComponent = (props: any) => {
  const { historyFixture, handleBackFixture, preActive, idTeam } = props;
  const isLoading = useSelector((state: any) => state.loadingReducer.loading);
  const lastMatches = idTeam.isHome
    ? historyFixture.h2h.homeLastMatches
    : historyFixture.h2h.awayLastMatches;

  const teamName =
    historyFixture.fixtures.homeId === idTeam.teamId
      ? historyFixture.fixtures.homeName
      : historyFixture.fixtures.awayName;
  const groupedByLeague = (headToHead) => {
    return headToHead.reduce((groups, entry) => {
      const league = entry.split(",")[2];
      if (!groups[league]) {
        groups[league] = [];
      }
      groups[league].push(entry);
      return groups;
    }, []);
  };
  useEffect(() => {
    store.dispatch(setLoading(false));
  }, [isLoading, preActive]);

  return (
    <Paper className={Styles.PaperHistoryFixture}>
      <Box className={Styles.BoxHeaderHistoryFixture}>
        <Box className={clsx(Styles.AlignItemCenter, Styles.Gap20px)}>
          <ArrowCircleLeftSharpIcon
            onClick={() => {
              handleBackFixture(preActive);
            }}
            className={Styles.SharpIcon}
          />
          <Box className={Styles.AlignItemCenter}>
            <img height={65} width={65} src={historyFixture.league.logo} />
            <Box>
              <Box className={Styles.AlignItemFlexStart}>
                <Typography
                  className={clsx(
                    Styles.TextLeague,
                    GlobalStyles.FontMontserrat,
                    GlobalStyles.FontWeight600,
                    GlobalStyles.TextDark
                  )}
                >
                  {teamName}
                </Typography>
                <PushPinSharpIcon className={Styles.PinIcon} />
              </Box>
              <Box className={Styles.AlignItemFlexStart}>
                <Typography
                  className={clsx(
                    GlobalStyles.FontSizeSmall,
                    GlobalStyles.FontMontserrat,
                    GlobalStyles.FontWeight600,
                    GlobalStyles.TextDark
                  )}
                >
                  2023/2024
                </Typography>
                <Box className={Styles.NumberSeason}>10</Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <BetNowComponent />
      </Box>
      {lastMatches && lastMatches.length > 0 ? (
        groupedByLeague(lastMatches).map((fixtures, league) => (
          <HistoryBodyFixtureComponent
            preActive={preActive}
            home={idTeam.teamId}
            league={league}
            fixtures={fixtures}
            historyFixture={historyFixture}
          />
        ))
      ) : (
        <NoDataElement />
      )}
    </Paper>
  );
};

export default React.memo(HistoryFixtureComponent);
