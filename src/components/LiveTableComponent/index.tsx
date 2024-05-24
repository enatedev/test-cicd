import React, { useState, useEffect } from "react";
import Styles from "./tableComponent.module.scss";
import { Box, Grid, Paper, Typography, Collapse } from "@mui/material";
import clsx from "clsx";
import GlobalStyles from "../../../global.module.scss";
import OddTableLogo from "../../../public/Group.svg";
import { I18n } from "react-redux-i18n";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import FixtureComponent from "../LiveFixtureComponent";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FlagImage from "../../../public/flag.png";
import {RESOURCE_URL} from "../../utils/contants";

import SpinnerComponent from "../../components/SpinnerComponent";
import { useSelector } from "react-redux";
import { setLoading } from "../../../src/redux/actions/loadingAction";
import { store } from "../../redux/store";

const TableComponent = (props: any) => {
  const { setHistoryFixture, handleClickHistory, leagues, setIdTeam, activeButton } = props;
  const [openLeagues, setOpenLeagues] = useState({});
  const isLoading = useSelector((state: any) => state.loadingReducer.loading);

  useEffect(() => {
    if (leagues && leagues.length > 0) {
      const initialOpenStates = {};
      leagues.forEach((league) => {
        initialOpenStates[league.leagueId] = true;
      });
      setOpenLeagues(initialOpenStates);
      store.dispatch(setLoading(false));
    }
  }, [leagues, activeButton]);

  const handleOpenCollapse = (leagueId) => {
    setOpenLeagues((prev) => ({
      ...prev,
      [leagueId]: !prev[leagueId],
    }));
    store.dispatch(setLoading(false));
  };

  return isLoading ? (
    <SpinnerComponent />
  ) : (
    <Paper
      className={Styles.Container}
      style={{
        boxShadow: "none",
      }}
    >
      <Box className={Styles.BoxWrapperTable}>
        <Grid className={Styles.HeaderTable} container>
          <Grid
            className={clsx(
              GlobalStyles.BackgroundDark,
              Styles.ItemHeaderTable,
              GlobalStyles.TextLight,
              Styles.ItemHeightCollapse,
              Styles.BorderRadiusLeft
            )}
            item
            xs={0.75}
          >
            <Box>{I18n.t("hour")}</Box>
          </Grid>
          <Grid
            className={clsx(
              GlobalStyles.BackgroundDark,
              Styles.ItemHeaderTable,
              GlobalStyles.TextLight,
              Styles.ItemHeightCollapse
            )}
            item
            xs={2.25}
          >
           {I18n.t("match")}
          </Grid>
          <Grid item xs={3.5}>
            <Grid
              className={clsx(
                GlobalStyles.BackgroundRed,
                GlobalStyles.TextLight,
                Styles.ItemHeaderTable,
                Styles.ItemHeightNotCollapse
              )}
              container
            >
             {I18n.t("full_match")}
            </Grid>
            <Grid container>
              <Grid
                className={clsx(
                  GlobalStyles.BackgroundRed,
                  GlobalStyles.TextLight,
                  Styles.ItemHeaderTable,
                  Styles.ItemHeightNotCollapse
                )}
                xs={4}
                item
              >
               {I18n.t("handicap")}
              </Grid>
              <Grid
                className={clsx(
                  GlobalStyles.BackgroundRed,
                  GlobalStyles.TextLight,
                  Styles.ItemHeaderTable,
                  Styles.ItemHeightNotCollapse
                )}
                xs={4}
                item
              >
                {I18n.t("under_over")}
              </Grid>
              <Grid
                className={clsx(
                  GlobalStyles.BackgroundRed,
                  GlobalStyles.TextLight,
                  Styles.ItemHeaderTable,
                  Styles.ItemHeightNotCollapse
                )}
                xs={4}
                item
              >
               {I18n.t("1x2")}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3.5}>
            <Grid
              className={clsx(
                GlobalStyles.BackgroundRed,
                GlobalStyles.TextLight,
                Styles.ItemHeaderTable,
                Styles.ItemHeightNotCollapse
              )}
              container
            >
             {I18n.t("half_time")}
            </Grid>
            <Grid container>
              <Grid
                className={clsx(
                  GlobalStyles.BackgroundRed,
                  GlobalStyles.TextLight,
                  Styles.ItemHeaderTable,
                  Styles.ItemHeightNotCollapse
                )}
                xs={4}
                item
              >
               {I18n.t("handicap")}
              </Grid>
              <Grid
                className={clsx(
                  GlobalStyles.BackgroundRed,
                  GlobalStyles.TextLight,
                  Styles.ItemHeaderTable,
                  Styles.ItemHeightNotCollapse
                )}
                xs={4}
                item
              >
                {I18n.t("under_over")}
              </Grid>
              <Grid
                className={clsx(
                  GlobalStyles.BackgroundRed,
                  GlobalStyles.TextLight,
                  Styles.ItemHeaderTable,
                  Styles.ItemHeightNotCollapse
                )}
                xs={4}
                item
              >
               {I18n.t("1x2")}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={clsx(
              GlobalStyles.BackgroundRed,
              Styles.ItemHeaderTable,
              Styles.BorderRadiusRight
            )}
            item
            xs={2}
          >
            <img src={RESOURCE_URL + 'Group.svg'} loading="lazy" />
          </Grid>
        </Grid>
      </Box>
      <Box className={Styles.Leagues}>
      {leagues &&
        leagues.length > 0 &&
        leagues.map((item) => (
          <Box>
          <React.Fragment key={item.leagueId}>
            <Box className={Styles.BoxWrapperHeader}>
              <Grid
                onClick={() => {
                  handleOpenCollapse(item.leagueId);
                }}
                className={Styles.HeaderGrid}
                container
              >
                <Grid className={Styles.HeaderGridItemLeft} item>
                  {openLeagues[item.leagueId] ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowDropUpIcon />
                  )}
                  <img height={15} width={21} src={item.logo} />
                  <Typography
                    className={clsx(
                      GlobalStyles.FontMontserrat,
                      GlobalStyles.FontWeight600,
                      GlobalStyles.FontSizeSmall,
                      GlobalStyles.TextDark
                    )}
                  >
                    {item.name}
                  </Typography>
                </Grid>
                <Grid
                  className={clsx(
                    GlobalStyles.TextLight,
                    Styles.HeaderGridItem
                  )}
                  item
                >
                  <CollectionsBookmarkIcon />
                  <Typography
                    // onClick={() => {
                    //   handleClickHistory("history_league");
                    // }}
                  >
                    {I18n.t("history")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box style={{ position: "relative" }}>
              <Collapse
                in={openLeagues[item.leagueId]}
                timeout="auto"
                unmountOnExit
              >
                {item.fixtures &&
                  item.fixtures.length > 0 &&
                  item.fixtures.map((fixture) => (
                    <FixtureComponent
                      setHistoryFixture={setHistoryFixture}
                      handleClickHistory={handleClickHistory}
                      fixture={fixture}
                      setIdTeam={setIdTeam}
                      leagueId={item.leagueId}
                    />
                  ))}
              </Collapse>
            </Box>
          </React.Fragment>
          </Box>
        ))}
        </Box>
    </Paper>
  );
};

export default React.memo(TableComponent);
