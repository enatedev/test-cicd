import React from "react";
import { Typography, Button, Modal, Box } from "@mui/material";
import FilterContainerStyles from "../FilterContainerComponent/filterContainerComponent.module.scss";
import Styles from "./FavoriteTeamsComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import clsx from "clsx";
import SearchComponent from "../SearchComponent";
import { I18n } from "react-redux-i18n";
import { useSelector, useDispatch } from "react-redux";
import TeamWithFavoriteComponent from "../TeamWithFavoriteComponent";

const FavoriteTeamsComponent: React.FC = () => {
  const teamReducer = useSelector((state: any) => state.teamReducer);
  const fixtureReducer = useSelector((state: any) => state.fixtureReducer);
  const locale = useSelector((state: any) => state.i18n);
  const [open, setOpen] = React.useState(false);
  const [listTeam, setListTeam] = React.useState(
    teamReducer.allTeams.slice(0, 5)
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const targetSearchData = teamReducer.allTeams.filter((item) =>
      item.name.toLowerCase().includes(target.value.toLowerCase())
    );
    setListTeam(targetSearchData)
  };

  return (
    <>
      <Typography variant="subtitle1" className={FilterContainerStyles.Title} color={'#000 !important'}>
        {I18n.t("favourite_teams")}
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        marginTop: '10px', 
        marginBottom: '10px' 
      }}>
        {
          teamReducer.favoriteTeams.map((team: any, index: number) => (
            <TeamWithFavoriteComponent key={index} team={team} isSmallText={true} />
          ))
        }
      </Box>

      <Button onClick={handleOpen} className={clsx(Styles.AddFavoriteBtn, GlobalStyles.TextBaseDark)}>
        + {I18n.t("add_team")}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-favorite-team-modal"
        aria-describedby="add-favorite-team-modal-description"
      >
        <Box className={Styles.AddFavoriteTeamModal}>
          <Box className={Styles.FavoriteTeamLabel}>
            <Typography className={GlobalStyles.TextMediumLight} color={'#000 !important'}>
              {I18n.t("favourite_teams")}
            </Typography>
          </Box>
          <Box className={Styles.FavoriteTeamContent}>
            <SearchComponent
              placeholder={I18n.t("search")}
              onChange={handleSearchTextChange}
            />

            <Typography
              className={clsx(
                GlobalStyles.TextMediumDark,
                GlobalStyles.TextCenter
              )}
            >
              {I18n.t("5_teams_like")}
            </Typography>

            <Typography
              className={clsx(
                GlobalStyles.TextMediumDark,
                GlobalStyles.TextCenter,
                Styles.MostSearchedTeamsText
              )}
            >
              {I18n.t("other_most_find")}
            </Typography>

            <Box className={Styles.FavoriteTeamModalContent}>
              {listTeam.map((team, index) => (
                <TeamWithFavoriteComponent key={index} team={team} isSmallText={false} />
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(FavoriteTeamsComponent);
