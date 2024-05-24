import { BASE_URL, API_KEY } from "./contants";
import { axiosGet, axiosPost, axiosDelete } from "./ajax";

export const GetFixturesByDate = (params = {}) => {
  const url = `${BASE_URL}/fixtures-all-by-date`;
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyOTQwNjkzYi01NGFmLTQxZDAtODUzYS00MThhNzI3M2RhZDIiLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwidHlwZSI6Im1hbnVhbCIsImRvbWFpbiI6ImFkbWluIiwiaWF0IjoxNzE1OTEyNjU5fQ.66BibtSdQA447vwoVierT0wZseZVRAGsbdQtzA1GbAA`,
  };
  return axiosGet(url, params, headers);
};


export const GetLeagueStandingByLeagueId = (params = {}) => {
  const url = `${BASE_URL}/league-standing`;
  const headers = {
  };
  return axiosGet(url, params, headers);
};