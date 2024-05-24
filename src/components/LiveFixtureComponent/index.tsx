import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Collapse,
} from "@mui/material";
import Styles from "./fixtureComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import { I18n } from "react-redux-i18n";
import DetailedAnalysis from "../DetailedAnalysisComponent";
import TeamScoreComponent from "../TeamScoreComponent";
import FlagFixtureComponent from "../FlagFixtureComponent";
import ExpandBetComponent from "../ExpandBetComponent";
import moment from "moment";
import BetNowComponent from "../BetNowComponent";
import { useSelector } from "react-redux";
import { setFavoriteFixtures } from "../../redux/actions/fixtureAction";
import { store } from "../../redux/store";
import { setLoading } from "../../../src/redux/actions/loadingAction";
import { 
  FAVORITE_RED_ICON_URL, 
  FAVORITE_BLACK_ICON_URL, 
  ODDS_DISPLAY_TYPE 
} from "../../utils/contants";
import VectorRed from "../../../public/vector_red.svg"
import VectorGreen from "../../../public/vector_green.svg"
import OddsPanelComponent from "../OddsPanelComponent";

export const OddValueComponent = (props: any) => {
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
            {item.value && (
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
            )}
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

const GridFixtureComponent = (props: any) => {
  const { setHistoryFixture, handleClickHistory, dataFullmatch, fixture, setIdTeam, dataHalftime } =
    props;
    const date = moment.unix(fixture.fixtures?.matchTime).tz('Asia/Ho_Chi_Minh').format('DD/MM');
    const time = moment.unix(fixture.fixtures?.matchTime).tz('Asia/Ho_Chi_Minh').format('HH:mm');
  return (
    <>
      <Grid
        className={clsx(Styles.GridContainer, GlobalStyles.FontMontserrat)}
        container
      >
        <Grid
          item
          xs={0.75}
          className={clsx(Styles.FixtureGrid, Styles.BorderTopLeftRadius)}
        >
          <Box className={Styles.PaddingTop20}>
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight700,
                GlobalStyles.TextDark
              )}
            >
              {date}
            </Typography>
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight700,
                GlobalStyles.TextRed
              )}
            >
              {time}
              <div className={GlobalStyles.TextRed}>(GMT +7)</div>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2.25} className={Styles.FixtureGrid}>
          <Box className={Styles.PaddingTop10}>
            <TeamScoreComponent
              setHistoryFixture={setHistoryFixture}
              handleClickHistory={handleClickHistory}
              fixture={fixture}
              team={fixture.fixtures?.homeName}
              score={fixture.fixtures?.homeScore}
              teamId={fixture.fixtures?.homeId}
              setIdTeam={setIdTeam}
              isHome={true}
            />
            <TeamScoreComponent
              setHistoryFixture={setHistoryFixture}
              handleClickHistory={handleClickHistory}
              fixture={fixture}
              team={fixture.fixtures?.awayName}
              score={fixture.fixtures?.awayScore}
              teamId={fixture.fixtures?.awayId}
              setIdTeam={setIdTeam}
              isHome={false}
            />
          </Box>
        </Grid>
        <Grid item xs={7} className={Styles.FixtureGrid} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <OddsPanelComponent labelEnable={false} fixture={fixture} oddsPrematchs={fixture.oddsPrematchs}/>
        </Grid>
        {/* <Grid item xs={3.5} className={Styles.FixtureGrid}>
          <Box className={Styles.FixtureItemGrid}>
            <OddValueComponent data={dataFullmatch.dataHDC} />
            <OddValueComponent data={dataFullmatch.dataUo}  />
            <OddValueComponent data={dataFullmatch.data1x2} />
          </Box>
          <Divider />
          <Box className={Styles.FixtureItemGrid}>
            <OddValueComponent data={dataFullmatch.dataHDC} />
            <OddValueComponent data={dataFullmatch.dataUo}  />
            <OddValueComponent data={dataFullmatch.data1x2} />
          </Box>
        </Grid>
        <Grid item xs={3.5} className={Styles.FixtureGrid}>
          <Box className={Styles.FixtureItemGrid}>
            <OddValueComponent data={dataHalftime.dataHDC} />
            <OddValueComponent data={dataHalftime.dataUo} />
            <OddValueComponent data={dataHalftime.data1x2} />
          </Box>
          <Divider />
          <Box className={Styles.FixtureItemGrid}>
            <OddValueComponent data={dataHalftime.dataHDC} />
            <OddValueComponent data={dataHalftime.dataUo} />
            <OddValueComponent data={dataHalftime.data1x2} />
          </Box>
        </Grid> */}
        <Grid
          item
          xs={2}
          className={clsx(Styles.FixtureGrid, Styles.BorderTopRightRadius)}
        >
          <Box
            className={clsx(Styles.FixtureItemGrid, Styles.AlignItemFlexCenter)}
          >
            <BetNowComponent />
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

const FixtureComponent = (props: any) => {
  const {
    setHistoryFixture,
    handleClickHistory,
    fixture,
    setIdTeam,
    leagueId,
  } = props;

  const isLoading = useSelector((state: any) => state.loadingReducer.loading);
  const [activeButton, setActiveButton] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [open, setOpen] = useState(false);
  const [europeOdds, setEuropeOdds] = useState(null);
  const [handicap, setHandicap] = useState(null);
  const [handicapHalftime, setHandicapHalftime] = useState(null);
  const [overUnder, setOverUnder] = useState(null);
  const [overUnderHalftime, setOverUnderHalftime] = useState(null);
  const [euro2, setEuro2] = useState(false)
  const [euro3, setEuro3] = useState(false)
  const [euro4, setEuro4] = useState(false)
  const [handicap3, setHandicap3] = useState(false)
  const [handicap4, setHandicap4] = useState(false)
  const [overUnder3, setOverUnder3] = useState(false)
  const [overUnder4, setOverUnder4] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const handleLikeFixture = () => {
    store.dispatch(setLoading(true));
    const data = {
      matchId: fixture.fixtures.matchId,
      leagueId,
    };
    store.dispatch(setFavoriteFixtures(data));
    store.dispatch(setLoading(false));
  };

  // useEffect(() => {
  //   const ws = new WebSocket(
  //     "ws://ec2-18-232-186-210.compute-1.amazonaws.com:8080"
  //   );

  //   ws.onopen = () => {
  //     console.log("Connected to server");

  //     const message = JSON.stringify({
  //       routes: "live-odds",
  //       params: { matchId: fixture.fixtures.matchId },
  //     });

  //     ws.send(message);
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log("data.europeOddsTmp[0] ====> ", data.europeOddsTmp[0])
  //     const europeOddsTmp = data.europeOddsTmp[0]
  //       ? data.europeOddsTmp[0].split(",")
  //       : [];
  //     const handicapHalfTmp = data.handicapHalfTmp[0]
  //       ? data.handicapHalfTmp[0].split(",")
  //       : [];
  //     const handicapTmp = data.handicapTmp[0]
  //       ? data.handicapTmp[0].split(",")
  //       : [];
  //     const overUnderHalfTmp = data.overUnderHalfTmp[0]
  //       ? data.overUnderHalfTmp[0].split(",")
  //       : [];
  //     const overUnderTmp = data.overUnderTmp[0]
  //       ? data.overUnderTmp[0].split(",")
  //       : [];
  //     if (!europeOdds || (europeOdds[2] != europeOddsTmp[2] || europeOdds[3] != europeOddsTmp[3] || europeOdds[4] != europeOddsTmp[4]) ) {
  //       if (europeOdds && europeOdds.length > 0) {
  //         if (parseFloat(europeOddsTmp[2]) > parseFloat(europeOdds[2])) {
  //           setEuro2(true)
  //         }
  //         if (parseFloat(europeOddsTmp[2]) < parseFloat(europeOdds[2])) {
  //           setEuro2(false)
  //         }
  //         if (parseFloat(europeOddsTmp[3]) < parseFloat(europeOdds[3])) {
  //           setEuro3(true)
  //         }
  //         if (parseFloat(europeOddsTmp[3]) < parseFloat(europeOdds[3])) {
  //           setEuro3(false)
  //         }
  //         if (parseFloat(europeOddsTmp[4]) < parseFloat(europeOdds[4])) {
  //           setEuro4(true)
  //         }
  //         if (parseFloat(europeOddsTmp[4]) < parseFloat(europeOdds[4])) {
  //           setEuro4(false)
  //         }
  //       }
  //       setEuropeOdds(europeOddsTmp);
  //     }
  //     if (!handicap || handicap[2] != handicapTmp[2] || handicap[3] != handicapTmp[3] || handicap[4] != handicapTmp[4]) {
  //       if (handicap && handicap.length > 0) {
  //         if (parseFloat(handicapTmp[3]) > parseFloat(handicap[3])) {
  //           setHandicap3(true)
  //         }
  //         if (parseFloat(handicapTmp[3]) < parseFloat(handicap[3])) {
  //           setHandicap3(false)
  //         }
  //         if (parseFloat(handicapTmp[4]) > parseFloat(handicap[4])) {
  //           setHandicap4(true)
  //         }
  //         if (parseFloat(handicapTmp[4]) < parseFloat(handicap[4])) {
  //           setHandicap4(false)
  //         }
  //       }
  //       // console.log("handicap =====> ", handicap)
  //       setHandicap(handicapTmp)
  //     }
  //     if (!overUnder || overUnder[2] != overUnderTmp[2] || overUnder[3] != overUnderTmp[3] || overUnder[4] != overUnderTmp[4] || !overUnder) {
  //       if (overUnder && overUnder.length > 0) {
  //         if (parseFloat(overUnderTmp[3]) > parseFloat(overUnder[3])) {
  //           setOverUnder3(true)
  //         }
  //         if (parseFloat(overUnderTmp[3]) < parseFloat(overUnder[3])) {
  //           setOverUnder3(false)
  //         }
  //         if (parseFloat(overUnderTmp[4]) > parseFloat(overUnder[4])) {
  //           setOverUnder4(true)
  //         }
  //         if (parseFloat(overUnderTmp[4]) < parseFloat(overUnder[4])) {
  //           setOverUnder4(false)
  //         }
  //       }
  //       setOverUnder(overUnderTmp)
  //     }
  //     if (!overUnderHalftime || overUnderHalftime[2] != overUnderHalfTmp[2] || overUnderHalftime[3] != overUnderHalfTmp[3] || overUnderHalftime[4] != overUnderHalfTmp[4] || !overUnderHalftime) {
  //       // if (overUnderHalftime && overUnderHalftime.length > 0) {
  //       //   if (overUnderHalfTmp[2] > overUnderHalftime[2]) {
  //       //     setTangHdc2(true)
  //       //   }
  //       //   if (overUnderHalfTmp[2] < overUnderHalftime[2]) {
  //       //     setTangHdc2(false)
  //       //   }
  //       //   if (overUnderHalfTmp[3] > overUnderHalftime[3]) {
  //       //     setTangHdc3(true)
  //       //   }
  //       //   if (overUnderHalfTmp[3] < overUnderHalftime[3]) {
  //       //     setTangHdc3(false)
  //       //   }
  //       //   if (overUnderHalfTmp[4] > overUnderHalftime[4]) {
  //       //     setTangHdc4(true)
  //       //   }
  //       //   if (overUnderHalfTmp[4] < overUnderHalftime[4]) {
  //       //     setTangHdc4(false)
  //       //   }
  //       // }
  //       setOverUnderHalftime(overUnderHalfTmp)
  //     }
  //     if (!handicapHalftime || handicapHalftime[2] != handicapHalfTmp[2] || handicapHalftime[3] != handicapHalfTmp[3] || handicapHalftime[4] != handicapHalfTmp[4] || !handicapHalftime) {
  //       setHandicapHalftime(handicapHalfTmp)
  //     }



  //     console.log("WebSocket ~ data ===> ", data);
  //     // store.dispatch(getEventFixture(data))
  //   };

  //   ws.onclose = () => {
  //     console.log("Disconnected from server");
  //   };

  //   // Cleanup function
  //   return () => {
  //     ws.close();
  //   };
  // }, []);
  // console.log("fixture =====> ", fixture)
  useEffect(() => {
    if (fixture.oddsPrematchs) {
      
    
    const europeOdds = fixture.oddsPrematchs.europeOdds.length > 0 ? fixture.oddsPrematchs.europeOdds[0].split(",") : []
    setEuropeOdds(europeOdds)
    const handicapOdds = fixture.oddsPrematchs.handicap.length > 0 ? fixture.oddsPrematchs.handicap[0].split(",") : []
    setHandicap(handicapOdds)
    const handicapHalf = fixture.oddsPrematchs.handicapHalf.length > 0 ? fixture.oddsPrematchs.handicapHalf[0].split(",") : []
    setHandicapHalftime(handicapHalf)
    const overUnder = fixture.oddsPrematchs.overUnder.length > 0 ? fixture.oddsPrematchs.overUnder[0].split(",") : []
    setOverUnder(overUnder)
    const overUnderHalf = fixture.oddsPrematchs.overUnderHalf.length > 0 ? fixture.oddsPrematchs.overUnderHalf[0].split(",") : []
    setOverUnderHalftime(overUnderHalf)
    }
  },[])
  const dataFullmatch = {
    data1x2: [
      {
        value: europeOdds && europeOdds.length > 0 ? europeOdds[2] : [],
        tang: euro2
      },
      {
        value: europeOdds && europeOdds.length > 0 ? europeOdds[3] : [],
        tang: euro3
      },
      {
        value: europeOdds && europeOdds.length > 0 ? europeOdds[4] : [],
        tang: euro4
      },
    ],
    dataHDC: [
      {
        value: handicap && handicap.length > 0 ? handicap[2] : [],
        odd: handicap && handicap.length > 0 ? handicap[3] : [],
        tang: handicap3
      },
      {
        value: handicap && handicap.length > 0 ? handicap[2] : [],
        odd: handicap && handicap.length > 0 ? handicap[4] : [],
        tang: handicap4
      },
    ],
    dataUo: [
      {
        value: overUnder && overUnder.length > 0 ? overUnder[2] : [],
        odd: overUnder && overUnder.length > 0 ? overUnder[3] : [],
        tang: overUnder3
      },
      {
        value: overUnder && overUnder.length > 0 ? overUnder[2] : [],
        odd: overUnder && overUnder.length > 0 ? overUnder[4] : [],
        tang: overUnder4
      },
    ],
  };

  const dataHalftime = {
    data1x2: [
      {
        value: europeOdds && europeOdds.length > 0 ? europeOdds[2] : [],
        tang: euro2
      },
      {
        value: europeOdds && europeOdds.length > 0 ? europeOdds[3] : [],
        tang: euro3
      },
      {
        value: europeOdds && europeOdds.length > 0 ? europeOdds[4] : [],
        tangHdc2: euro4
      },
    ],
    dataHDC: [
      {
        value: handicapHalftime && handicapHalftime.length > 0 ? handicapHalftime[2] : [],
        odd: handicapHalftime && handicapHalftime.length > 0 ? handicapHalftime[3] : [],
        tang: false
      },
      {
        value: handicapHalftime && handicapHalftime.length > 0 ? handicapHalftime[2] : [],
        odd: handicapHalftime && handicapHalftime.length > 0 ? handicapHalftime[4] : [],
        tang: false
      },
    ],
    dataUo: [
      {
        value: overUnderHalftime && overUnderHalftime.length > 0 ? overUnderHalftime[2] : [],
        odd: overUnderHalftime && overUnderHalftime.length > 0 ? overUnderHalftime[3] : [],
        tang: overUnder3
      },
      {
        value: overUnderHalftime && overUnderHalftime.length > 0 ? overUnderHalftime[2] : [],
        odd: overUnderHalftime && overUnderHalftime.length > 0 ? overUnderHalftime[4] : [],
        tang: overUnder3
      },
    ],
  };
  // console.log("dataFullmatch =====> ", dataFullmatch);
  return (
    <>
      <Paper className={Styles.FixtureContainer}>
        <GridFixtureComponent
          setHistoryFixture={setHistoryFixture}
          handleClickHistory={handleClickHistory}
          // dataFullmatch={dataFullmatch}
          // dataHalftime={dataHalftime}
          fixture={fixture}
          setIdTeam={setIdTeam}
        />
        <Box
          className={clsx(
            Styles.FixtureFooter,
            Styles.BorderBottomLeftRadius,
            Styles.BorderBottomRightRadius
          )}
        >
          <DetailedAnalysis
            handleChangeButton={handleOpen}
            active={activeButton}
            fixture={fixture}
          />
          <Box
            // onClick={handleOpenCollapse}
            className={Styles.FixtureFooterCenter}
          >
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
          <Box style={{ width: "141px" }}></Box>
        </Box>
        <FlagFixtureComponent
          classFlag={Styles.ClassFlag}
          classStar={Styles.ClassStar}
          handleLikeFixture={handleLikeFixture}
          background={
            fixture.isLike ? FAVORITE_RED_ICON_URL : FAVORITE_BLACK_ICON_URL
          }
        />
      </Paper>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <ExpandBetComponent />
      </Collapse>
    </>
  );
};

export default React.memo(FixtureComponent);
