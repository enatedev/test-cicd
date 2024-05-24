import React from "react";
import { Box, Typography } from "@mui/material";
import Styles from "./teamScore.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";

const TeamScoreComponent = (props: any) => {
  const {
    setHistoryFixture,
    handleClickHistory,
    fixture,
    team,
    score,
    setIdTeam,
    teamId,
    isHome,
    fixtureTeamId,
  } = props;

  return (
    <Box className={clsx(Styles.FixtureItemBox)}>
      <Box className={Styles.DisplayFlexCenter}>
        {/* <img
          width="13"
          height="15"
          src="https://media.api-sports.io/football/teams/822.png"
        ></img> */}
        <Typography
          onClick={() => {
            setHistoryFixture(fixture);
            setIdTeam({
              teamId: teamId,
              isHome: isHome,
            });
            handleClickHistory("history_league");
          }}
          className={clsx(
            GlobalStyles.FontMontserrat,
            GlobalStyles.FontSizeSmall,
            GlobalStyles.FontWeight600,
            fixtureTeamId && fixtureTeamId === teamId ? GlobalStyles.TextRed : GlobalStyles.TextDark
          )}
        >
          {team ?? "Arsenal"}
        </Typography>
      </Box>
      <Typography
        className={clsx(
          GlobalStyles.FontMontserrat,
          GlobalStyles.FontSizeSmall,
          GlobalStyles.FontWeight600,
          Styles.FixtureItemScore,
          GlobalStyles.TextDark
        )}
      >
        {score ?? "1"}
      </Typography>
    </Box>
  );
};

export default React.memo(TeamScoreComponent);
