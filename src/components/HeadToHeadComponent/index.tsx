import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "preact/hooks";
import Styles from "./headToHeadComponent.module.scss";
import { HistoryBodyFixtureComponent } from "../HistoryFixtureComponent";
import { H2H } from "../../utils/example/h2h";
import { I18n } from "react-redux-i18n";

const HeadToHeadComponent = (props: any) => {
  const [value, setValue] = useState("1");
  const { h2h, data } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const All_League = () => {
    const headToHead = data.headToHead ?? [];
    return (
      <>
        {groupedByLeague(headToHead).map((fixtures, league) => (
          <HistoryBodyFixtureComponent
            preActive={"finished"}
            home={h2h.home.id}
            h2h={h2h}
            league={league}
            fixtures={fixtures}
          />
        ))}
      </>
    );
  };

  const HomeLastMatches = () => {
    const homeLastMatches = (data.homeLastMatches ?? []).filter(
      (fixture) => h2h.home.id === fixture.split(",")[5]
    );
    return (
      <>
        {groupedByLeague(homeLastMatches).map((fixtures, league) => (
          <HistoryBodyFixtureComponent
            preActive={"finished"}
            home={h2h.home.id}
            league={league}
            fixtures={fixtures}
          />
        ))}
      </>
    );
  };

  const AwayLastMatches = () => {
    const awayLastMatches = (data.awayLastMatches ?? []).filter(
      (fixture) => h2h.away.id === fixture.split(",")[7]
    );
    console.log("groupedByLeague(awayLastMatches) ----- ===> ", groupedByLeague(awayLastMatches))
    return (
      <>
        {groupedByLeague(awayLastMatches).map((fixtures, league) => (
          <HistoryBodyFixtureComponent
            preActive={"finished"}
            home={h2h.away.id}
            league={league}
            fixtures={fixtures}
          />
        ))}
      </>
    );
  };

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

  return (
    <Box
      className={Styles.ModalBottom}
      sx={{
        width: "100%",
        typography: "body1",
        "& .MuiTabPanel-root": {
          padding: "unset",
          maxHeight: "400px",
          overflow: "scroll",
        },
      }}
    >
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{
              style: {
                height: "0px",
              },
            }}
            sx={{
              "& .MuiTabs-flexContainer": {
                gap: "10px",
              },
              "& .MuiTab-root ": {
                color: "#1c1c1c",
                borderRadius: "20px",
                minHeight: "unset",
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
                fontSize: "11px",
                fontWeight: 600,
              },
              "& .Mui-selected": {
                color: "#fff !important",
                backgroundColor: "#A1A1A1",
              },
            }}
          >
            <Tab className={Styles.Tab} label={I18n.t("all")} value="1" />
            <Tab
              className={Styles.Tab} label={`${h2h.home.name} - Home`} value="2" />
            <Tab className={Styles.Tab} label={`${h2h.away.name} - Away`} value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <All_League />{" "}
        </TabPanel>
        <TabPanel value="2">
          <HomeLastMatches />
        </TabPanel>
        <TabPanel value="3">
          <AwayLastMatches />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default HeadToHeadComponent;
