import * as actionTypes from "../reducers/actionTypes";
import { GetFixturesByDate } from "../../utils/function";
import { dispatch } from "../store";

export const getFixturesByDate =
  (data: any) =>
  async (dispatch: (arg0: { type: string; payload: unknown }) => void) => {
    // const data = {
    //   date: "2024-05-19",
    // };
    const res: any = await GetFixturesByDate(data);
    const matchesByLeague = res.data.reduce((acc, match) => {
      const leagueId = match.fixtures.leagueId;
      if (!acc[leagueId]) {
        acc[leagueId] = [];
      }
      acc[leagueId].push(match);
      return acc;
    }, {});
    const reformattedData = Object.entries(matchesByLeague).map(
      ([leagueId, details]: any) => {
        return ({
          leagueId,
          name: details[0].league.name,
          country: details[0].league.country,
          countryLogo: details[0].league.countryLogo,
          logo: details[0].league.logo,
          shortName: details[0].league.shortName,
          subLeagueName: details[0].league.subLeagueName,
          type: details[0].league.type,
          fixtures: details.map((item) => ({
            ...item,
            isLike: false
          })),
          favouriteFixtures: [],
        })
      }
    );
    console.log("reformattedData ====> ", reformattedData)
    dispatch({ type: actionTypes.SET_FIXTURES, payload: reformattedData });
  };

export const getEventFixture =
  (data: any) =>
  async (dispatch: (arg0: { type: string; payload: unknown }) => void) => {
    // const objectsArray = data.map((item: any) => JSON.parse(item));
    dispatch({ type: actionTypes.SET_EVENT_DATA, payload: data });
  };

export const setFavoriteFixtures = (data: any) => {
  // dispatch({ type: actionTypes.SET_LOADING, payload: true })
  return { type: actionTypes.SET_FAVORITE_FIXTURE, payload: data };
};
