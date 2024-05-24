import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { ODDS } from "../../utils/example/odds";
import Styles from "./oddsPanelComponent.module.scss";
import Global from "../../../global.module.scss";
import clsx from "clsx";
import { BOOKMARKERS, ODDS_DISPLAY_TYPE } from "../../utils/contants";
import SelectComponent from "../SelectComponent";
import GlobalStyles from "../../../global.module.scss";
import { I18n } from "react-redux-i18n";
import LockComponent from "../LockComponent";
import { useSelector } from "react-redux";

const OddsPanelComponent = (props) => {
  const {fixture, labelEnable} = props;
  let { handicap, overUnder, europeOdds, handicapHalf, overUnderHalf }: any = [];
  let { handicapTmp, overUnderTmp, europeOddsTmp, handicapHalfTmp, overUnderHalfTmp }: any = [];
  const [listOdds, setListOdds] = useState(fixture.oddsPrematchs);
  const [listOddsLive, setListOddsLive] = useState(fixture.oddsPrematchs);
  const [isLive, setIsLive] = useState(false);
  
  const bookmarkerRedux = useSelector((state: any) => state.bookmakerReducer);
  const [bookmarker, setBookmaker] = useState(bookmarkerRedux);

  useEffect(() => {
    setListOdds(filterDataOdds(fixture.oddsPrematchs, bookmarkerRedux))
    
  }, [bookmarkerRedux, bookmarker])

  useEffect(() => {
    setListOdds(filterDataOdds(fixture.oddsPrematchs, bookmarker))

  }, [bookmarker])

  // useEffect(() => {
  //   if(fixture.fixtures.status === 0) {
  //   const ws = new WebSocket(
  //     "ws://ec2-18-232-186-210.compute-1.amazonaws.com:8080"
  //   );

  //   ws.onopen = () => {
  //     // console.log("Connected to server");

  //   const message = JSON.stringify({
  //       routes: 'live-odds',
  //       params: { matchId: fixture.fixtures.matchId }
  //   });

  //     ws.send(message);
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);      
  //     if(data.handicapTmp.length > 0 ||
  //       data.europeOddsTmp.length > 0 ||
  //       data.overUnderTmp.length > 0 ||
  //       data.handicapHalfTmp.length > 0 ||
  //       data.overUnderHalfTmp.length > 0) {
  //         setIsLive(true)
  //         setListOddsLive(data)
  //       }
      
  //   };

  //   ws.onclose = () => {
  //     // console.log("Disconnected from server");
  //   };

  //   // Cleanup function
  //   return () => {
  //     ws.close();
  //   };
  // }
  // }, []);
  
  if(isLive) {
    ({ handicapTmp, overUnderTmp, europeOddsTmp, handicapHalfTmp, overUnderHalfTmp } = listOddsLive);
    if (Array.isArray(handicapTmp) && handicapTmp.length > 0) {
      handicapTmp = handicapTmp[0].split(",");
    }
    
    if (Array.isArray(overUnderTmp) && overUnderTmp.length > 0) {
      overUnderTmp = overUnderTmp[0].split(",");
    }
    
    if (Array.isArray(europeOddsTmp) && europeOddsTmp.length > 0) {
      europeOddsTmp = europeOddsTmp[0].split(",");
    }
    
    if (Array.isArray(handicapHalfTmp) && handicapHalfTmp.length > 0) {
      handicapHalfTmp = handicapHalfTmp[0].split(",");
    }
    
    if (Array.isArray(overUnderHalfTmp) && overUnderHalfTmp.length > 0) {
      overUnderHalfTmp = overUnderHalfTmp[0].split(",");
    }
    // console.log('on');
  }

  ({ handicap, overUnder, europeOdds, handicapHalf, overUnderHalf } = listOdds);

  if (Array.isArray(handicap) && handicap.length > 0) {
    handicap = handicap[0].split(",");
  }
  
  if (Array.isArray(overUnder) && overUnder.length > 0) {
    overUnder = overUnder[0].split(",");
  }
  
  if (Array.isArray(europeOdds) && europeOdds.length > 0) {
    europeOdds = europeOdds[0].split(",");
  }
  
  if (Array.isArray(handicapHalf) && handicapHalf.length > 0) {
    handicapHalf = handicapHalf[0].split(",");
  }
  
  if (Array.isArray(overUnderHalf) && overUnderHalf.length > 0) {
    overUnderHalf = overUnderHalf[0].split(",");
  }

  const preMatch = {
    fullMatch: [
      {
        type: "handicap",
        data: {
          bet: Array.isArray(handicap) && handicap.length > 2 ? + handicap[2] : null,
          over: Array.isArray(handicap) && handicap.length > 3 ? handicap[3] : null,
          under: Array.isArray(handicap) && handicap.length > 4 ? handicap[4] : null,
        },
      },
      {
        type: "overUnder",
        data: {
          bet: Array.isArray(overUnder) && overUnder.length > 2 ? overUnder[2] : null,
          over: Array.isArray(overUnder) && overUnder.length > 3 ? overUnder[3] : null,
          under: Array.isArray(overUnder) && overUnder.length > 4 ? overUnder[4] : null,
        },
      },
      {
        type: "europeOdds",
        data: {
          home: Array.isArray(europeOdds) && europeOdds.length > 2 ? europeOdds[2] : null,
          draw: Array.isArray(europeOdds) && europeOdds.length > 3 ? europeOdds[3] : null,
          away: Array.isArray(europeOdds) && europeOdds.length > 4 ? europeOdds[4] : null,
        },
      },
    ],
    firstHalf: [
      {
        type: "handicap",
        data: {
          bet: Array.isArray(handicapHalf) && handicapHalf.length > 2 ? + handicapHalf[2] : null,
          over: Array.isArray(handicapHalf) && handicapHalf.length > 3 ? handicapHalf[3] : null,
          under: Array.isArray(handicapHalf) && handicapHalf.length > 4 ? handicapHalf[4] : null,
        },
      },
      {
        type: "overUnder",
        data: {
          bet: Array.isArray(overUnderHalf) && overUnderHalf.length > 2 ? overUnderHalf[2] : null,
          over: Array.isArray(overUnderHalf) && overUnderHalf.length > 3 ? overUnderHalf[3] : null,
          under: Array.isArray(overUnderHalf) && overUnderHalf.length > 4 ? overUnderHalf[4] : null,
        },
      },
    ],
  };
  
  const inPlay = {
    fullMatch: [
      {
        type: "handicap",
        data: {
          bet: Array.isArray(handicap) && handicap.length > 5 ? + handicap[5] : null,
          over: Array.isArray(handicap) && handicap.length > 6 ? handicap[6] : null,
          under: Array.isArray(handicap) && handicap.length > 7 ? handicap[7] : null,
        },
      },
      {
        type: "overUnder",
        data: {
          bet: Array.isArray(overUnder) && overUnder.length > 5 ? overUnder[5] : null,
          over: Array.isArray(overUnder) && overUnder.length > 6 ? overUnder[6] : null,
          under: Array.isArray(overUnder) && overUnder.length > 7 ? overUnder[7] : null,
        },
      },
      {
        type: "europeOdds",
        data: {
          home: Array.isArray(europeOdds) && europeOdds.length > 5 ? europeOdds[5] : null,
          draw: Array.isArray(europeOdds) && europeOdds.length > 6 ? europeOdds[6] : null,
          away: Array.isArray(europeOdds) && europeOdds.length > 7 ? europeOdds[7] : null,
        },
      },
    ],
    firstHalf: [
      {
        type: "handicap",
        data: {
          bet: Array.isArray(handicapHalf) && handicapHalf.length > 5 ? + handicapHalf[5] : null,
          over: Array.isArray(handicapHalf) && handicapHalf.length > 6 ? handicapHalf[6] : null,
          under: Array.isArray(handicapHalf) && handicapHalf.length > 7 ? handicapHalf[7] : null,
        },
      },
      {
        type: "overUnder",
        data: {
          bet: Array.isArray(overUnderHalf) && overUnderHalf.length > 5 ? overUnderHalf[5] : null,
          over: Array.isArray(overUnderHalf) && overUnderHalf.length > 6 ? overUnderHalf[6] : null,
          under: Array.isArray(overUnderHalf) && overUnderHalf.length > 7 ? overUnderHalf[7] : null,
        },
      },
    ],
  };
  

  const liveOdd = {
    fullMatch: [
      {
        type: "handicap",
        data: {
          bet: Array.isArray(handicapTmp) && handicapTmp.length > 2 ? + handicapTmp[2] : null,
          over: Array.isArray(handicapTmp) && handicapTmp.length > 3 ? handicapTmp[3] : null,
          under: Array.isArray(handicapTmp) && handicapTmp.length > 4 ? handicapTmp[4] : null,
        },
      },
      {
        type: "overUnder",
        data: {
          bet: Array.isArray(overUnderTmp) && overUnderTmp.length > 2 ? overUnderTmp[2] : null,
          over: Array.isArray(overUnderTmp) && overUnderTmp.length > 3 ? overUnderTmp[3] : null,
          under: Array.isArray(overUnderTmp) && overUnderTmp.length > 4 ? overUnderTmp[4] : null,
        },
      },
      {
        type: "europeOdds",
        data: {
          home: Array.isArray(europeOddsTmp) && europeOddsTmp.length > 2 ? europeOddsTmp[2] : null,
          draw: Array.isArray(europeOddsTmp) && europeOddsTmp.length > 3 ? europeOddsTmp[3] : null,
          away: Array.isArray(europeOddsTmp) && europeOddsTmp.length > 4 ? europeOddsTmp[4] : null,
        },
      },
    ],
    firstHalf: [
      {
        type: "handicap",
        data: {
          bet: Array.isArray(handicapHalfTmp) && handicapHalfTmp.length > 2 ? + handicapHalfTmp[2] : null,
          over: Array.isArray(handicapHalfTmp) && handicapHalfTmp.length > 3 ? handicapHalfTmp[3] : null,
          under: Array.isArray(handicapHalfTmp) && handicapHalfTmp.length > 4 ? handicapHalfTmp[4] : null,
        },
      },
      {
        type: "overUnder",
        data: {
          bet: Array.isArray(overUnderHalfTmp) && overUnderHalfTmp.length > 2 ? overUnderHalfTmp[2] : null,
          over: Array.isArray(overUnderHalfTmp) && overUnderHalfTmp.length > 3 ? overUnderHalfTmp[3] : null,
          under: Array.isArray(overUnderHalfTmp) && overUnderHalfTmp.length > 4 ? overUnderHalfTmp[4] : null,
        },
      },
    ],
  };  

  return (
    <Box sx={{ flexGrow: 1 }} className={clsx(Global.TextMediumDark, labelEnable ? Styles.ModalOdds : Styles.NotModalOdds)}>
      {labelEnable ? (<Grid container spacing={3}>
        <Grid xs>
          <Heading setBookmaker={setBookmaker} bookmarkerRedux={bookmarkerRedux}/>
        </Grid>
      </Grid>) : (<></>)}
      <Grid container height={'50%'}>
        <Grid xs>
          {isLive ? ( <PeriodComponent labelEnable={labelEnable}  period={I18n.t("opening")} odds={liveOdd} />) : ( <PeriodComponent labelEnable={labelEnable} period={I18n.t("opening")} odds={inPlay} />)}
        </Grid>
      </Grid>
      <Grid container  borderTop={"1px solid #D9D9D9"} height={'50%'}>
        <Grid xs>
          <PeriodComponent labelEnable={labelEnable} period={I18n.t("pre_match")} odds={preMatch} />
        </Grid>
      </Grid>
    </Box>
  );
};

const OddType = (props) => {
  const { odds } = props;
  return odds.map((odd) => {
    let oddComponent;

    let { bet, over, under } = odd.data;
    switch (odd.type) {
      case "handicap":
        oddComponent = (
          <Grid
            xs={4}
            display={"flex"}
            justifyItems={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Odd bet={bet} odd={over} />
            <Odd odd={under} />
          </Grid>
        );
        break;
      case "overUnder":
        oddComponent = (
          <Grid
            xs={4}
            display={"flex"}
            justifyItems={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Odd bet={bet} odd={over} />
            <Odd bet={"u"} odd={under} />
          </Grid>
        );
        break;
      default:
        const { home, draw, away } = odd.data;
        oddComponent = (
          <Grid
            xs={4}
            display={"flex"}
            justifyItems={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Odd odd={home} />
            <Odd odd={draw} />
            <Odd odd={away} />
          </Grid>
        );
        break;
    }
    return oddComponent;
  });
};

const PeriodComponent = (props) => {
  const { period, odds, labelEnable } = props;
  let totalCol = 17, firstCol = 3, secondCol = 7, thirdCol = 7;
  if (!labelEnable) {
    totalCol = 2;
    firstCol = 0;
    secondCol = 1;
    thirdCol = 1;
  }  
  return (
    <Box sx={{ flexGrow: 1 }} height={'100%'} className={Styles.BoxPeriod}>
      <Grid container spacing={labelEnable ? 3 : 0} columns={totalCol} height={'100%'}>
        {labelEnable ? (<Grid
          xs={firstCol}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {period}
        </Grid>): (<></>)}
        <Grid xs={secondCol} borderRight={'1px solid #D9D9D9'}>
          <Box sx={{ flexGrow: 1 }} height={'100%'} >
            <Box className={Styles.BoxPeriodChild}>
              <Grid container spacing={0} width={'100%'} className={Styles.GridChild}>
                <OddType odds={odds.fullMatch} />
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid xs={thirdCol}>
          <Box sx={{ flexGrow: 1 }} height={'100%'} >
            <Box className={Styles.BoxPeriodChild}>
              <Grid container spacing={0} width={'100%'} className={Styles.GridChild}>
                <OddType odds={odds.firstHalf} />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const Heading = (props) => {
  const { labelEnable, setBookmaker, bookmarkerRedux } = props;

  let totalCol = 17, firstCol = 3, secondCol = 7, thirdCol = 7;
  if (labelEnable) {
    totalCol = 2;
    firstCol = 0;
    secondCol = 1;
    thirdCol = 1;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} columns={totalCol} textAlign={"center"}>
      <Grid xs={firstCol}>
          <SelectComponent
            setBookmaker={setBookmaker}
            data={BOOKMARKERS}
            value={bookmarkerRedux}
            className={[
              GlobalStyles.BackgroundWhite,
              GlobalStyles.TextDark,
              Styles.SelectCompanyBet,
            ]}
          />
        </Grid>
        <Grid xs={secondCol}>
          {I18n.t("full_match")}
          <Label />
        </Grid>
        <Grid xs={thirdCol}>
        {I18n.t("half_time")}
          <Label />
        </Grid>
      </Grid>
    </Box>
  );
};

const Label = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={0}
        columns={12}
        textAlign={"center"}
        marginTop={"10px"}
      >
        <Grid xs={4} border={"1px solid #D9D9D9"} padding={"unset"}>
          {"HDC"}
        </Grid>
        <Grid
          xs={4}
          border={"1px solid #D9D9D9"}
          padding={"unset"}
          borderLeft={"unset"}
          borderRight={"unset"}
        >
          {I18n.t("under_over")}
        </Grid>
        <Grid xs={4} border={"1px solid #D9D9D9"} padding={"unset"}>
          {"1x2"}
        </Grid>
      </Grid>
    </Box>
  );
};

const Odd = (props) => {
  const oddsBetDisplayType = useSelector((state: any) => state.oddsDisplayTypeReducer);
  let { odd, bet } = props;  

  if (typeof bet === 'number') {
    bet = 0 - bet;
  }
  
  if(odd === null) {
    return (<><div className={clsx(Styles.OddWrapper, Global.TextMediumDark)} style={{ padding: "7px", display: 'flex', justifyContent:'center' }} ><LockComponent/></div></>)
  }

  const displayOddsValueByType = (value: any) => {
    switch (oddsBetDisplayType) {
      case ODDS_DISPLAY_TYPE[3].name: // MAL
        return parseFloat(value).toFixed(2);
      default:
        return parseFloat(value + 1).toFixed(2);
    }
  }
  
  return (
    <div
      className={clsx(Styles.OddWrapper, Global.TextMediumDark)}
      style={{ padding: "7px" }}
    >
      <div className={Styles.Bet} style={{ color: "#E01932" }}>
        {bet}
      </div>
      <div className={Styles.Odd}>{displayOddsValueByType(+odd)}</div>
      <div className={Styles.Status}></div>
      
    </div>
  );
};

const filterDataOdds = (data, filterValue) => {
  const filteredData = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      filteredData[key] = data[key].filter(item => +item.split(',')[1] === +filterValue);
    }
  }

  return filteredData;
};

export default React.memo(OddsPanelComponent);
