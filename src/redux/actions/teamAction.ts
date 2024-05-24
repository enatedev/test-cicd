import * as actionTypes from "../reducers/actionTypes";


export const addFavoriteTeam = (team: any) => ({
  type: actionTypes.ADD_FAVORITE_TEAM,
  payload: team
});

export const removeFavoriteTeam = (teamId: number) => ({
  type: actionTypes.REMOVE_FAVORITE_TEAM,
  payload: teamId
});
