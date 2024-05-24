import React, { useEffect } from "react";
import Styles from "./overviewComponent.module.scss";
import Global from "../../../global.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { EVENT_TYPE_NOTED } from "../../utils/contants";
import EventComponent from "../EventComponent";
import { I18n } from "react-redux-i18n";
import { useSelector } from "react-redux";
import NoDataElement from "../NoDataComponent";

const OverviewComponent = (props: any) => {
  const { fixture } = props;
  const locale = useSelector((state: any) => state.i18n)
  const lang = locale.locale;
  console.log(lang);
  
  const noted = EVENT_TYPE_NOTED.map((item) => (
    <div className={Styles.Note}>
      <img src={item.url} alt="" />
      <span>{I18n.t(item.text)}</span>
    </div>
  ));
  
  return (
    <Box>
      <Grid container spacing={2} columns={16}>
        <Grid xs={8}>
          <p className={Global.TextBaseDark}>{I18n.t("live_match")}</p>
          <Box>
          <iframe
              width="100%"
              height={"275px"}
              style="border-radius: 7px;border: unset;"
              src={`https://www.isportslive8.com/football/detail.html?matchId=${fixture.fixtures.matchId}&accessKey=PTJkehrxASq3ngRywjR4rWm71eNRynFg&lang=${lang}&statsPanel=show`}
              title="W3Schools Free Online Web Tutorials"
            ></iframe>
            
          </Box>
        </Grid>
        <Grid xs={8}>
          <p className={Global.TextBaseDark}>{I18n.t("information_match")}</p>
          <Box>
            <EventComponent fixture={fixture} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={16}>
        <Grid xs={16}>
          <p className={Global.TextBaseDark}>{I18n.t("noted")}</p>
          <div className={Styles.NotesWrapper}>{noted}</div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(OverviewComponent);
