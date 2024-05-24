import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "preact/hooks";
import { Lineup } from "../../LineupComponent/index";
import OverviewComponent from "../../OverviewComponent";
import StatisticTabComponent from "../../StatisticTabComponent";
import FixtureInformationComponent from "../../FixtureInfomationComponent";
import Styles from "./modalBottomComponent.module.scss";
import "../../../../variable.scss";
import LeagueStandingComponent from "../../LeagueStandingComponent";
import HeadToHeadComponent from "../../HeadToHeadComponent";
import OddsPanelComponent from "../../OddsPanelComponent";
import { I18n } from "react-redux-i18n";
import NoDataElement from "../../NoDataComponent";

const ModalBottom = (props: any) => {
  const { fixture } = props;
  // const h2hId = {
  //   home: fixture.fixtures.homeId,
  //   away: fixture.fixtures.awayId,
  // };
  const h2hId = {
    home: {
      id: fixture.fixtures.homeId,
      name: fixture.fixtures.homeName,
    },
    away: {
      id: fixture.fixtures.awayId,
      name: fixture.fixtures.awayName,
    },
  };
  const [value, setValue] = useState("1");
  const handleChange = (event: any, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      className={Styles.ModalBottom}
      sx={{
        width: "100%",
        typography: "body1",
        "& .MuiTabPanel-root": {
          padding: "unset",
          paddingTop: "15px",
        },
      }}
    >
      <TabContext value={value}>
        <Box>
          <TabList
            TabIndicatorProps={{
              style: {
                backgroundColor: "#E01932",
                height: "6px",
              },
            }}
            variant="fullWidth"
            className={Styles.TabList}
            onChange={handleChange}
            aria-label="lab API tabs example"
            style={{
              zIndex: "9999999",
              position: "relative",
              minHeight: "40px",
            }}
            centered
          >
            <Tab label={I18n.t("overview")} value="1" />
            <Tab label={I18n.t("statistical")} value="2" />
            <Tab label={I18n.t("ratio")} value="3" />
            <Tab label={I18n.t("lineup")} value="4" />
            <Tab label="H2H" value="5" />
            <Tab label={I18n.t("information")} value="6" />
            <Tab label={I18n.t("standing")} value="7" />
          </TabList>
        </Box>

        <TabPanel value="1">
        
          <OverviewComponent fixture={fixture} />
        </TabPanel>
        <TabPanel value="2">
          <StatisticTabComponent stats={fixture} />
        </TabPanel>
        <TabPanel value="3">
          <OddsPanelComponent labelEnable={true} fixture={fixture} oddsPrematchs={fixture.oddsPrematchs}/>
        </TabPanel>
        <TabPanel value="4">
          {fixture.fixtures.status === 0 ? (<NoDataElement/>) : (<Lineup lineUps={fixture.lineUps} />)}
        </TabPanel>
        <TabPanel value="5">
          {fixture.h2h ? (<HeadToHeadComponent data={fixture.h2h} h2h={h2hId} />):(<NoDataElement/>)}
          
        </TabPanel>
        <TabPanel value="6">
          <FixtureInformationComponent />
        </TabPanel>
        <TabPanel value="7">
          <LeagueStandingComponent leagueId={fixture.fixtures.leagueId}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ModalBottom;
