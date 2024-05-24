import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'preact/hooks';
import {STATISTICS} from '../../utils/contants'
import './statisticTabComponent.scss'
import Global from '../../../global.module.scss';
import clsx from 'clsx';
import Styles from './statisticTabComponent.module.scss'
import { I18n } from "react-redux-i18n";
import NoDataElement from '../NoDataComponent';

const StatisticListComponent = (props) => {

  const {period} = props;  
  const STATISTICS_MAPPING = [
    { "type": 0, "name": I18n.t("kick_off") },
    { "type": 1, "name": I18n.t("first_corner") },
    { "type": 2, "name": I18n.t("first_yellow_card") },
    { "type": 3, "name": I18n.t("shots") },
    { "type": 4, "name": I18n.t("shots_on_goal") },
    { "type": 5, "name": I18n.t("fouls") },
    { "type": 6, "name": I18n.t("corner_kick") },
    { "type": 7, "name": I18n.t("corners_overtime") },
    { "type": 8, "name": I18n.t("free_kick") },
    { "type": 9, "name": I18n.t("offside") },
    { "type": 10, "name": I18n.t("own_goal") },
    { "type": 11, "name": I18n.t("yellow_card") },
    { "type": 12, "name": I18n.t("yellow_card_overtime") },
    { "type": 13, "name": I18n.t("red_card") },
    { "type": 14, "name": I18n.t("possession") },
    { "type": 15, "name": I18n.t("aerial") },
    { "type": 16, "name": I18n.t("save") },
    { "type": 17, "name": I18n.t("goalkeeper_come_out") },
    { "type": 18, "name": I18n.t("dispossessed") },
    { "type": 19, "name": I18n.t("successful_tackles") },
    { "type": 20, "name": I18n.t("interceptions") },
    { "type": 21, "name": I18n.t("long_pass") },
    { "type": 22, "name": I18n.t("short_pass") },
    { "type": 23, "name": I18n.t("assist") },
    { "type": 24, "name": I18n.t("successful_center") },
    { "type": 25, "name": I18n.t("first_substitution") },
    { "type": 26, "name": I18n.t("last_substitution") },
    { "type": 27, "name": I18n.t("first_offside") },
    { "type": 28, "name": I18n.t("last_offside") },
    { "type": 29, "name": I18n.t("substitution") },
    { "type": 30, "name": I18n.t("last_corner") },
    { "type": 31, "name": I18n.t("last_yellow_card") },
    { "type": 32, "name": I18n.t("substitution_overtime") },
    { "type": 33, "name": I18n.t("offside_overtime") },
    { "type": 34, "name": I18n.t("shots_off_goal") },
    { "type": 35, "name": I18n.t("hit_the_post") },
    { "type": 36, "name": I18n.t("head_success") },
    { "type": 37, "name": I18n.t("blocked") },
    { "type": 38, "name": I18n.t("tackle") },
    { "type": 39, "name": I18n.t("dribbles") },
    { "type": 40, "name": I18n.t("throw_in") },
    { "type": 41, "name": I18n.t("passes") },
    { "type": 42, "name": I18n.t("pass_success") },
    { "type": 43, "name": I18n.t("attacks") },
    { "type": 44, "name": I18n.t("dangerous_attacks") },
    { "type": 45, "name": I18n.t("corner_kicks_ht") },
    { "type": 46, "name": I18n.t("possession_ht") },
    { "type": 47, "name": I18n.t("penalty_save") }
  ]
  return period.map((el) => {
    
    let totalPoint, homePercent, awayPercent;
  
    if (isNaN(el.home) || isNaN(el.away)){
        

        if (el.home === "*" || el.away === "*") {
          if (el.home === "*") {
            homePercent = "100%"
            awayPercent = '0%';
          } else {
            homePercent = "0%"
            awayPercent = '100%';
          }
        } else {
          homePercent = el.home
          awayPercent = el.away
        }

    } else {

        totalPoint = + (+(el.home) + +(el.away));
      
        if(totalPoint != 0) {
            homePercent = Math.round((el.home / totalPoint) * 100);
            awayPercent = 100 - homePercent;
        } else {
            homePercent = 0;
            awayPercent = 0;
        }
        
        homePercent += '%';
        awayPercent += '%';
    }

    const statisticName = STATISTICS_MAPPING.find(item => item.type === el.type).name;    

    return(<StatisticComponent title={statisticName} homePercent={homePercent} home={el.home} awayPercent={awayPercent} away={el.away}/>)
  })
}


const StatisticComponent = (props) => {

  const {title, homePercent, awayPercent, home, away} = props;
  return (
    <div className={clsx(Global.TextBaseDark)}>
      <div class="statistic__element">
            <div class="statistic__wrapper">
                <div class="statistic__values ot-text text-dark">
                    <div class="home__value">{home}</div>
                    <div class="statistic__title">{title}</div>
                    <div class="away__value">{away}</div>
                </div>
                <div class="statistic__charts">
                    <div class="chart home__chart">
                        <div class="bg" style={`width: ${homePercent}`}></div>
                    </div>
                    <div class="chart away__chart">
                        <div class="bg" style={`width: ${awayPercent}`}></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

const StatisticTabComponent = (props) => {
  const [value, setValue] = useState('1');
  const {stats} = props
  if(stats.stats.length === 0) return (<NoDataElement/>)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
      className={Styles.ModalBottom} 
      sx={{ 
        width: '100%', 
        typography: 'body1', 
        '& .MuiTabPanel-root': {  // Styles for the selected tab
          padding: 'unset',
        }
    }}>
      <TabContext value={value}>
        <Box>
          <TabList 
              onChange={handleChange} 
              aria-label="lab API tabs example"
              TabIndicatorProps={{
                style: {
                    height: '0px',
                },
            }}

            sx={{
              '& .MuiTabs-flexContainer' :{
                gap: '10px'
              },
              '& .MuiTab-root ': {  // Default styles for all tabs
                color: '#1c1c1c', 
                borderRadius: '20px',
                minHeight: 'unset',
                backgroundColor: '#E5E5E5',
              },
              '& .Mui-selected': {  // Styles for the selected tab
                color: '#fff !important',
                backgroundColor: '#A1A1A1',
              }
            }}
            
            >
            <Tab className={Styles.Tab} label={I18n.t("full_match")} value="1" />
          </TabList>
        </Box>

        <TabPanel value="1" className={Styles.Statistic}><StatisticListComponent period={stats.stats[0].stats}/></TabPanel>
      </TabContext>
    </Box>
  );
}

export default StatisticTabComponent;