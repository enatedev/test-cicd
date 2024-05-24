import React, { useState } from "react";
import { Box, Grid, Paper, Typography, Select, MenuItem } from "@mui/material";
import Styles from "./headerComponent.module.scss";
import clsx from "clsx";
import OddTableLogo from "../../../public/Group.svg";
import ButtonComponent from "../ButtonComponent";
import GlobalStyles from "../../../global.module.scss";
import SelectComponent from "../SelectComponent";
import { useSelector } from "react-redux";
import { I18n, setLocale } from "react-redux-i18n";
import DatePickerComponent from "../DatePickerComponent";
import { BOOKMARKERS } from "../../utils/contants";
import { store } from "../../redux/store";
import ThaiFlag from "../../assets/thailand.png";
import VietFlag from "../../assets/vietnam.png";
import {RESOURCE_URL} from "../../utils/contants";
import { dispatch } from '../../redux/store';
import { changeOddsDisplayType } from '../../redux/actions/oddsDisplayTypeAction';
import { setLoading } from "../../../src/redux/actions/loadingAction";
import { changeBookmaker } from "../../redux/actions/bookmakerAction";


const oddBet = [
  {
    id: "CN",
    name: "CN",
  },
  {
    id: "DEC",
    name: "DEC",
  },
  {
    id: "HK",
    name: "HK",
  },
  {
    id: "MAL",
    name: "MAL",
  },
  {
    id: "INDO",
    name: "INDO",
  },
];

const HeaderComponent = (props: any) => {
  const { handleChangeButton, activeButton, headerButton } = props;
  const locale = useSelector((state: any) => state.i18n);

  const handleChangeLang = (value: string) => {
    store.dispatch(setLocale(value));
  };

  const handleOddsDisplayTypeChange = (event: any) => {
    dispatch(changeOddsDisplayType(event.target.value));
  }
  const handleBookmakerChange = (event: any) => {
    dispatch(changeBookmaker(event.target.value));
  }
  
  return (
    <Paper className={Styles.HeaderContainer}>
      <Grid className={Styles.HeaderBox} container>
        <Box className={clsx(Styles.HeaderBoxBlack)}>
          <Grid container>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={2}>
              <Grid className={Styles.HeaderOddTableGrid} container>
                <img src={RESOURCE_URL + 'Group.svg'} loading="lazy" />
                <Typography className={Styles.HeaderOddTableText}>
                {I18n.t("odd_table")}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={0.5}>
              <Grid
                className={clsx(
                  Styles.HeaderOddTableGrid,
                  Styles.AlignItemCenter
                )}
                container
              >
                <Select
                  className={clsx(
                    Styles.SelectLocale,
                    GlobalStyles.BackgroundLight
                  )}
                  value={locale.locale}
                  onChange={(e: any) => {
                    handleChangeLang(e.target.value);
                  }}
                >
                  <MenuItem className={Styles.MenuItemSelect} value={"th"}><img height={10} width={20} src={RESOURCE_URL + 'thailand.png'} /></MenuItem>
                  <MenuItem className={Styles.MenuItemSelect} value={"vi"}><img height={10} width={20} src={RESOURCE_URL + 'vietnam.png'} /></MenuItem>
                  <MenuItem className={Styles.MenuItemSelect} value={"en"}><img height={10} width={20} src={RESOURCE_URL + 'en.png'} /></MenuItem>
                </Select> 
              </Grid>
            </Grid>
            <Grid item xs={1.5}>
              <Grid
                className={clsx(
                  Styles.HeaderOddTableGrid,
                  GlobalStyles.Gap10,
                  Styles.AlignItemCenter
                )}
                container
              >
                <DatePickerComponent />
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid
                className={clsx(
                  Styles.HeaderOddTableGrid,
                  GlobalStyles.Gap10,
                  Styles.AlignItemCenter
                )}
                container
              >
                {headerButton.map((item) => (
                  <ButtonComponent
                    handleChangeButton={handleChangeButton}
                    title={item.text}
                    value={item.value}
                    active={activeButton}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid
                className={clsx(
                  Styles.HeaderOddTableGrid,
                  GlobalStyles.Gap10,
                  Styles.AlignItemEnd
                )}
                container
              >
                <SelectComponent
                  data={oddBet}
                  className={[
                    GlobalStyles.BackgroundDark,
                    GlobalStyles.TextLight,
                    Styles.SelectOddBet,
                  ]}
                  onChange={handleOddsDisplayTypeChange}
                />
                <SelectComponent
                  onChange={handleBookmakerChange}
                  data={BOOKMARKERS}
                  className={[
                    GlobalStyles.BackgroundWhite,
                    GlobalStyles.TextDark,
                    Styles.SelectCompanyBet,
                  ]}
                />
              </Grid>
            </Grid>
            <Grid item xs={0.5}></Grid>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

export default React.memo(HeaderComponent);
