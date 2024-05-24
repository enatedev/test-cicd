import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import Styles from "./favoriteTableComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import { I18n } from "react-redux-i18n";
import OddTableLogo from "../../../public/Group.svg";
import { RESOURCE_URL } from "../../utils/contants";
import NoDataElement from "../NoDataComponent";

import FavoriteFixtureComponent from "../FavoriteFixtureComponent";

const FavoriteTableComponent = (props: any) => {
  const { value, handleClickHistory, leagues } = props;
  const finisedFixture = leagues.map((league) =>
    league.fixtures.filter((fixture) => fixture.fixtures.status === -1)
  );
  const likeFixture = leagues.map((league) =>
    league.fixtures.filter((fixture) => fixture.isLike === true)
  );

  return (
    <Paper className={Styles.Container} style={{ boxShadow: "none" }}>
      <Box className={Styles.BoxWrapperTable}>
        <Grid className={Styles.HeaderTable} container>
          <Grid
            className={clsx(
              GlobalStyles.BackgroundDark,
              GlobalStyles.TextLight,
              Styles.ItemHeaderTable,
              Styles.ItemHeightCollapse,
              Styles.BorderRadiusLeft
            )}
            xs={3}
            item
          >
            <Box>{I18n.t("status")}</Box>
          </Grid>
          <Grid
            className={clsx(
              GlobalStyles.BackgroundDark,
              GlobalStyles.TextLight,
              Styles.ItemHeaderTable,
              Styles.ItemHeightCollapse
            )}
            xs={3}
            item
          >
            <Box>{I18n.t("match")}</Box>
          </Grid>
          <Grid
            className={clsx(
              GlobalStyles.BackgroundDark,
              GlobalStyles.TextLight,
              Styles.ItemHeaderTable,
              Styles.ItemHeightCollapse
            )}
            xs={3}
            item
          >
            <Box>{I18n.t("result")}</Box>
          </Grid>
          <Grid
            className={clsx(
              GlobalStyles.BackgroundRed,
              GlobalStyles.TextLight,
              Styles.ItemHeaderTable,
              Styles.ItemHeightCollapse,
              Styles.BorderRadiusRight
            )}
            xs={3}
            item
          >
            <img src={RESOURCE_URL + "Group.svg"} loading="lazy" />
          </Grid>
        </Grid>
      </Box>
      <Box>
        {value === "finished" ? (
          finisedFixture.some((fixtures) => fixtures.length > 0) ? (
            leagues.map((league) =>
              league.fixtures
                .filter((fixture) => fixture.fixtures.status === -1)
                .map((fixture) => (
                  <FavoriteFixtureComponent
                    league={league}
                    fixture={fixture.fixtures}
                    globalFixtures={fixture}
                    handleClickHistory={handleClickHistory}
                  />
                ))
            )
          ) : (
            <NoDataElement />
          )
        ) : likeFixture.some((fixtures) => fixtures.length > 0) ? (
          leagues.map((league) =>
            league.fixtures
              .filter((fixture) => fixture.isLike === true)
              .map((fixture) => (
                <FavoriteFixtureComponent
                  league={league}
                  fixture={fixture.fixtures}
                  globalFixtures={fixture}
                  handleClickHistory={handleClickHistory}
                />
              ))
          )
        ) : (
          <NoDataElement />
        )}
      </Box>
    </Paper>
  );
};

export default React.memo(FavoriteTableComponent);
