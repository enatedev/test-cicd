import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import FilterContainerStyles from "../FilterContainerComponent/filterContainerComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import Styles from "./FilterComponent.module.scss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilterValue,
  removeFilterValue,
} from "../../redux/actions/filterAction";
import {
  setLoading
} from "../../redux/actions/loadingAction";
import { RootState, store } from "../../redux/store";
import { I18n } from "react-redux-i18n";

const FilterComponent = (props: any) => {
  const { filterName, filterValues } = props;
  const isLeagueFilter = filterName === "Bộ Lọc Giải Đấu";
  // const filterType = isLeagueFilter ? "selectedLeagues" : "selectedCountries";
  // const dispatch = useDispatch();
  const selectedLeagues = useSelector(
    (state: RootState) => state.filterReducer.selectedLeagues
  );

  const handleSelectedChange = (event: any) => {
    const newSelectedValues = event.target.value as string[];
    store.dispatch(setLoading(true))

    console.log("newSelectedValues ====> ", newSelectedValues);
    store.dispatch(addFilterValue(newSelectedValues))
    // if (newSelectedValues.length > selectedValues.length) {
    //   const selectedString = newSelectedValues.filter(
    //     (value) => !selectedValues.includes(value)
    //   )[0];

    //   dispatch(
    //     addFilterValue({ filterValue: selectedString, filterType: filterType })
    //   );
    // } else {
    //   const deselectedString = selectedValues.filter(
    //     (value: string) => !newSelectedValues.includes(value)
    //   )[0];

    //   dispatch(
    //     removeFilterValue({
    //       filterValue: deselectedString,
    //       filterType: filterType,
    //     })
    //   );
    // }
  };

  return (
    <>
      <Typography variant="subtitle1" className={FilterContainerStyles.Title}>
        {filterName}
      </Typography>

      <Box
        className={clsx(
          GlobalStyles.BackgroundTransparent,
          GlobalStyles.ShadowNone
        )}
        marginBottom={2}
        marginTop={1}
      >
        <Select
          value={selectedLeagues}
          onChange={handleSelectedChange}
          displayEmpty
          fullWidth
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: "#F7F7F7",
                boxShadow: "none",
              },
            },
          }}
          className={clsx(GlobalStyles.TextBaseRed, Styles.LeagueSelect)}
          sx={{
            "& .MuiSelect-icon": {
              color: "#E01932",
            },
          }}
        >
          <MenuItem className={GlobalStyles.TextBaseDark} value={0}>
            {I18n.t("all_leagues")}
          </MenuItem>
          {filterValues.map((value, index) => (
            <MenuItem
              key={index}
              value={value.id}
              className={GlobalStyles.TextBaseDark}
              sx={{ borderRadius: "20px" }}
            >
              {value.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default React.memo(FilterComponent);
