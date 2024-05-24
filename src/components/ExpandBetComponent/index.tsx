import React, { useState } from "react";
import Styles from "./expandBet.module.scss";
import { Box, Collapse, Card, Typography, Divider } from "@mui/material";
import clsx from "clsx";
import GlobalStyles from "../../../global.module.scss";
import { I18n } from "react-redux-i18n";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const OTHERBET = [
  {
    text: I18n.t("score"),
    value: "score",
  },
  {
    text: I18n.t("corner"),
    value: "corner",
  },
  {
    text: I18n.t("goal_odd_even"),
    value: "goal_odd_even",
  },
  {
    text: I18n.t("first_last_score"),
    value: "first_last_score",
  },
];

const ExpandScoreExactlyComponent = (props: any) => {
  // temp data
  const odds = [1.1, 1.8, 2.5, 3.2, 4.5, 5.3, 6.8, 7.9, 9.5, 10.5, 11.2, 12.3, 13.1, 14.5, 15.2, 16.4, 17.0, 18.9, 25.6, 44.2, 52.2, 66.8, 80.3, 129.5];
  const scores = ['0-1', '1-0', '1-1', '2-0', '2-1', '1-2', '0-2', '2-2', '3-0', '0-3', '3-1', '1-3', '3-2', '2-3', '3-3', '4-0', '0-4', '4-1', '1-4', '4-2', '2-4', '4-3', '3-4', '4-4'];

  return (
    <Box className={Styles.BodyItemCollapseExpand}>
      {scores.map((score, index) => (
        <Box key={score} className={Styles.BoxItemData}>
          <Typography
            className={clsx(
              GlobalStyles.FontMontserrat,
              GlobalStyles.FontSizeSmall,
              GlobalStyles.FontWeight600,
              GlobalStyles.TextDark,
              Styles.BoxItemValue
            )}
          >
            {score} {/* Render the score */}
          </Typography>
          <Card className={Styles.BoxItemScore}>
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight600,
                GlobalStyles.TextDark
              )}
            >
              {odds[index]} {/* Render the corresponding odd */}
            </Typography>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

const ExpandBetComponent = () => {
  const [openCollapseFulltime, setOpenCollapseFulltime] = useState(false);
  const [openCollapseHalftime, setOpenCollapseHalftime] = useState(false);
  const [valueBet, setValueBet] = useState(OTHERBET[0].value);
  const [activeTab, setActiveTab] = useState("score");

  const handleOpenCollapseFulltime = () => {
    setOpenCollapseFulltime(!openCollapseFulltime);
  };

  const handleOpenCollapseHalftime = () => {
    setOpenCollapseHalftime(!openCollapseHalftime);
  };

  const handleChangeBet = (value: string) => {
    setValueBet(value);
  };

  return (
    <Box className={Styles.Container}>
      <Box className={Styles.Header}>
        {OTHERBET.map((item) => (
          <Box
            onClick={() => {
              handleChangeBet(item.value);
            }}
            className={clsx(
              Styles.HeaderItem,
              valueBet === item.value && [GlobalStyles.BackgroundRed]
            )}
          >
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight600,
                valueBet === item.value
                  ? [GlobalStyles.TextLight]
                  : [GlobalStyles.TextDark]
              )}
            >
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box className={Styles.Body}>
        <Box className={Styles.BodyItem}>
          <Box
            onClick={handleOpenCollapseFulltime}
            className={Styles.BodyItemCollapse}
          >
            {openCollapseFulltime ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight600,
                GlobalStyles.TextDark
              )}
            >
              {I18n.t("full_match")}
            </Typography>
          </Box>
          <Collapse in={openCollapseFulltime} timeout="auto" unmountOnExit>
            <ExpandScoreExactlyComponent />
          </Collapse>
        </Box>
        <Divider />
        <Box className={Styles.BodyItem}>
          <Box
            onClick={handleOpenCollapseHalftime}
            className={Styles.BodyItemCollapse}
          >
            {openCollapseHalftime ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            <Typography
              className={clsx(
                GlobalStyles.FontMontserrat,
                GlobalStyles.FontSizeSmall,
                GlobalStyles.FontWeight600,
                GlobalStyles.TextDark
              )}
            >
              {I18n.t('half_time')}
            </Typography>
          </Box>
          <Collapse in={openCollapseHalftime} timeout="auto" unmountOnExit>
            <ExpandScoreExactlyComponent />
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ExpandBetComponent);
