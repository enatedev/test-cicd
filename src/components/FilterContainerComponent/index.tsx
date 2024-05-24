import React from "react";
import { Box, Typography, Link } from "@mui/material";
import SearchComponent from "../SearchComponent";
import FilterComponent from "../FilterComponent";
import FavoriteTeamsComponent from "../FavoriteTeamsComponent";
import Styles from "./filterContainerComponent.module.scss";
import { useDispatch } from "react-redux";
import { clearSearchText } from "../../redux/actions/filterAction";
import clsx from "clsx";
import { LEAGUES } from "../../utils/contants";
import { I18n } from "react-redux-i18n";
import GlobalStyles from "../../../global.module.scss";
import { setSearchText } from '../../redux/actions/filterAction';

const FilterContainerComponent: React.FC = () => {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearSearchText());
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    dispatch(setSearchText(target.value));
  }

  return (
    <Box
      id="ot-filter-container"
      className={Styles.FilterContainer}
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1" className={Styles.Title}>
          {I18n.t("search")}
        </Typography>

        {/* <Link
          onClick={handleClear}
          className={clsx(Styles.Title, Styles.TitleRed, GlobalStyles.CursorPointer)}
        >
          {I18n.t("clear")}
        </Link> */}
      </Box>

      <Box
        marginBottom={2}
        marginTop={1}
      >
        <SearchComponent 
          placeholder={I18n.t("team_or_league")}
          onChange={handleSearchTextChange}
        />
      </Box>
          
      <FilterComponent filterName={I18n.t("filter_label")} filterValues={LEAGUES} />

      {/* <FilterComponent filterName="Bộ Lọc Quốc Gia" filterValues={['Tất Cả Quốc Gia', 'England', 'France', 'Italia', 'Germany']} /> */}

      <FavoriteTeamsComponent />
    </Box>
  );
};

export default FilterContainerComponent;
