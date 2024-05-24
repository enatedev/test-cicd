import React from "react";
import Styles from "./tableComponent.module.scss";
import { Box, Grid, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import GlobalStyles from "../../../global.module.scss";
import OddTableLogo from "../../../public/Group.svg";
import { I18n } from "react-redux-i18n";
import SelectComponent from "../SelectComponent";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import FixtureComponent from "../FixtureComponent";
import {RESOURCE_URL} from "../../utils/contants";


const TableComponent = (props: any) => {
  const { fixtures } = props

  return (
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
            xs={1}
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
            xs={1.5}
          >
            {I18n.t("match")}
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
            xs={1.5}
          >
            <img src={RESOURCE_URL + 'Group.svg'} loading="lazy" />
          </Grid>
        </Grid>
      </Box>
      <Box className={Styles.BoxWrapperHeader}>
        <Grid className={Styles.HeaderGrid} container>
          <Grid item>
            <SelectComponent />
          </Grid>
          <Grid className={clsx(GlobalStyles.TextLight, Styles.HeaderGridItem)} item>
            <CollectionsBookmarkIcon />
            <Typography>{I18n.t("history")}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ position: 'relative' }}>
        <FixtureComponent />
      </Box>
    </Paper>
  );
};

export default React.memo(TableComponent);
