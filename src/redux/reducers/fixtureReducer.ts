import { IFixtures } from "../interfaces";
import { initialState } from "./initialState";
import { SET_FIXTURES, SET_FAVORITE_FIXTURE, SET_EVENT_DATA } from "./actionTypes";

const FixtureReducer = (state: any = initialState, action: any): IFixtures => {
  switch (action.type) {
    case SET_FIXTURES: {
      return {
        ...state,
        leagues: action.payload,
      };
    }
    case SET_FAVORITE_FIXTURE: {
      const { leagueId, matchId } = action.payload;
      const updatedLeagues = state.leagues.map((league) => {
        if (league.leagueId === leagueId) {
          const updatedFixtures = league.fixtures.map((fixture) => {
            if (fixture.fixtures.matchId === matchId) {
              const isLike = !fixture.isLike
              return {
                ...fixture,
                isLike: isLike,
              };
            }
            return fixture;
          });
          return {
            ...league,
            fixtures: updatedFixtures,
          };
        }
        return league;
      });

      return {
        ...state,
        leagues: updatedLeagues,
      };
    }
    case SET_EVENT_DATA:
      return {
        ...state,
        fixtures: state.fixtures.map(fixture => {
          console.log("fixture ====> ", fixture)
          const payload = action.payload.find(p => p.fixtureId === fixture.fixtures.matchId);
          if (payload) {
            return {
              ...fixture,
              events: payload.events
            };
          }
          return fixture;
        })
      };
    default:
      return state;
  }
};

export default FixtureReducer;
