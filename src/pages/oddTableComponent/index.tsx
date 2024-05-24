import React, { useEffect, useState, useMemo } from "react";
import Styles from "./oddTableComponent.module.scss";
import { RootState, store } from "../../redux/store";
import TableComponent from "../../components/LiveTableComponent";
import { Box, Grid, Paper } from "@mui/material";
import { I18n } from "react-redux-i18n";
import HeaderComponent from "../../components/HeaderComponent";
import FavoriteTableComponent from "../../components/FavoriteTableComponent";
import HistoryFixtureComponent from "../../components/HistoryFixtureComponent";
import FilterContainerComponent from "../../components/FilterContainerComponent";
import { getFixturesByDate } from "../../../src/redux/actions/fixtureAction";
import { setLoading } from "../../../src/redux/actions/loadingAction";
import { useSelector } from "react-redux";
import moment from "moment";
import NoDataElement from "../../components/NoDataComponent";

const OddTableComponent = () => {
  const locale = useSelector((state: any) => state.i18n);
  const HEADER_BUTTON = [
    {
      text: I18n.t("all"),
      value: "all",
    },
    {
      text: I18n.t("live_odd"),
      value: "odd_live",
    },
    {
      text: I18n.t("end"),
      value: "finished",
    },
    {
      text: I18n.t("like"),
      value: "like",
    },
  ];

  // const [isLoading, setIsLoading] = useState(true);

 

  const selectedLeagues = useSelector(
    (state: RootState) => state.filterReducer.selectedLeagues
  );
  const fixtureReducer = useSelector(
    (state: RootState) => state.fixtureReducer
  );
  const searchText = useSelector(
    (state: RootState) => state.filterReducer.textSearch
  );

  const [preActive, setPreActive] = useState("");
  const [activeButton, setActiveButton] = useState(HEADER_BUTTON[0].value);
  const [historyFixture, setHistoryFixture] = useState({});
  const [idTeam, setIdTeam] = useState({});

  useEffect(() => {
    store.dispatch(setLoading(true));
    const data = {
      date: moment().format("YYYY-MM-DD"),
    };
    store
      .dispatch(getFixturesByDate(data))
      .then(() => store.dispatch(setLoading(false)))
      .catch((error) => {
        store.dispatch(setLoading(false));
        console.error("Error loading data:", error);
      });
  }, []);

  const handleChangeTab = (value: string) => {
    store.dispatch(setLoading(true));
    setPreActive(activeButton);
    setActiveButton(value);
  };

  const leaguesData =
    selectedLeagues === 0
      ? fixtureReducer.leagues
      : fixtureReducer.leagues.filter(
          (item) => item.leagueId == selectedLeagues
        );

  const searchLeagueAndFixture = (leaguesData, searchText) => {
    let filteredLeagues = [];
    if (leaguesData.length > 0) {
      if (searchText) {
        leaguesData.forEach((league) => {
          let filteredFixtures = [];
          league.fixtures.forEach((fixture) => {
            if (
              fixture.fixtures.homeName
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              fixture.fixtures.awayName
                .toLowerCase()
                .includes(searchText.toLowerCase())
            ) {
              filteredFixtures.push(fixture);
            }
          });
          if (filteredFixtures.length > 0) {
            const leagueCopy = { ...league, fixtures: filteredFixtures };
            filteredLeagues.push(leagueCopy);
          }
        });
      } else {
        filteredLeagues = [...leaguesData];
      }
    }
    return filteredLeagues;
  };

  const searchFixtures = useMemo(() => {
    return searchLeagueAndFixture(leaguesData, searchText);
  }, [leaguesData, searchText]);

  const liveFixtures = searchFixtures.map((league) =>
    league.fixtures.filter(
      (fixture) => fixture.fixtures.status === (1 || 2 || 3 || 4 || 5)
    )
  );

  return (
    <Paper className={Styles.Container}>
      <Box>
        <HeaderComponent
          handleChangeButton={handleChangeTab}
          activeButton={activeButton}
          headerButton={HEADER_BUTTON}
        />
        <Grid container>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={2} className={Styles.PaddingRight}>
            <FilterContainerComponent />
          </Grid>
          <Grid item xs={9}>
            {activeButton === HEADER_BUTTON[1].value &&
              (liveFixtures.some((fixtures) => fixtures.length > 0) ? (
                <TableComponent
                  setHistoryFixture={setHistoryFixture}
                  handleClickHistory={handleChangeTab}
                  leagues={[]}
                  setIdTeam={setIdTeam}
                />
              ) : (
                <NoDataElement />
              ))}
            {searchFixtures.length === 0 ? (
              <NoDataElement />
            ) : (
              (activeButton === HEADER_BUTTON[0].value && (
                <TableComponent
                  setHistoryFixture={setHistoryFixture}
                  handleClickHistory={handleChangeTab}
                  leagues={searchFixtures}
                  setIdTeam={setIdTeam}
                />
              )) ||
              (activeButton === HEADER_BUTTON[2].value && (
                <FavoriteTableComponent
                  handleClickHistory={handleChangeTab}
                  leagues={searchFixtures}
                  value={HEADER_BUTTON[2].value}
                  setIdTeam={setIdTeam}
                  setHistoryFixture={setHistoryFixture}
                />
              )) ||
              (activeButton === HEADER_BUTTON[3].value && (
                <FavoriteTableComponent
                  handleClickHistory={handleChangeTab}
                  leagues={searchFixtures}
                  value={HEADER_BUTTON[3].value}
                  setIdTeam={setIdTeam}
                  setHistoryFixture={setHistoryFixture}
                />
              )) ||
              (activeButton === "history_league" && (
                <HistoryFixtureComponent
                  preActive={preActive}
                  handleBackFixture={handleChangeTab}
                  historyFixture={historyFixture}
                  idTeam={idTeam}
                />
              ))
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default React.memo(OddTableComponent);
