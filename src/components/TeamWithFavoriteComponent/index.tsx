import { Box, Button } from "@mui/material";
import Styles from "./teamWithFavoriteComponent.module.scss";
import GlobalStyles from "../../../global.module.scss";
import { TEAM_FAVORITE_RED_ICON_URL, TEAM_FAVORITE_GRAY_ICON_URL } from "../../utils/contants";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteTeam, removeFavoriteTeam } from "../../redux/actions/teamAction";
import clsx from "clsx";

const TeamWithFavoriteComponent = ({ team, isSmallText}) => {
  const dispatch = useDispatch();

  const teamReducer = useSelector((state: any) => state.teamReducer);

  const favoriteTeamIconLink = (team: any, favoriteTeams: any) => {
    return favoriteTeams.some((obj: any) => obj.id === team.id) ? TEAM_FAVORITE_RED_ICON_URL : TEAM_FAVORITE_GRAY_ICON_URL;
  }

  const handleClick = () => {
    const isFavorite = teamReducer.favoriteTeams.some((obj: any) => obj.id === team.id);
    if (isFavorite) {
      dispatch(removeFavoriteTeam(team.id));
    } else {
      dispatch(addFavoriteTeam(team));
    }
  }

  return (
    <>
      <Box className={Styles.TeamWithFavoriteBtn}>
        <Box sx={{ width: '85%', display: 'flex', alignItem: 'center', gap: '10px' }}>
          <span className={GlobalStyles.FlexCenter}>
            <img 
              src={team.logo} 
              width={22}
              height={22}
              className={GlobalStyles.Margin0} 
            />
          </span>

          <span className={clsx(GlobalStyles.FlexCenter, isSmallText ? GlobalStyles.TextBaseDark : GlobalStyles.TextMediumDark)}>
            {team.name}
          </span>
        </Box>

        <Box sx={{width: '15%'}}>
          <img 
            onClick={handleClick} 
            src={favoriteTeamIconLink(team, teamReducer.favoriteTeams)} width={11}
            height={15} 
            className={clsx(GlobalStyles.Margin0, GlobalStyles.CursorPointer)} 
        />
        </Box>
      </Box>
    </>
  );
};

export default TeamWithFavoriteComponent;
