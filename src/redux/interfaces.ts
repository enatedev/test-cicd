export interface IFixtures {
  date: string,
  leagues: ILeague
}

export interface ILeague {
  leagueId: string;
  name: string;
  shortName: string;
  subLeagueName: string;
  type: number;
  country: string;
  countryLogo: string;
  logo: string;
  fixtures: IListFixture[];
  favoriteFixtures: IListFixture[]; 
}

export interface IListFixture {
  events: IEvents[];
  fixture: IFixture;
}

export interface IFixture {
  awayHalfScore: number;
  awayId: string;
  awayName: string;
  awayScore: number;
  explain: string;
  extraExplain: IExtraExplain;
  homeHalfScore: number;
  homeId: string;
  homeName: string;
  homeScore: number;
  leagueColor: string;
  leagueId: string;
  leagueName: string;
  leagueShortName: string;
  leagueType: number;
  matchId: string;
  matchTime: number;
  neutral: boolean;
  status: number
  isLike: boolean;
}

export interface IExtraExplain {
  awayScore: number;
  extraAwayScore: number;
  extraHomeScore: number;
  extraTimeStatus: number;
  homeScore: number;
  kickOff: number;
  minute: number;
  penAwayScore: number;
  penHomeScore: number;
  twoRoundsAwayScore: number;
  twoRoundsHomeScore: number;
  winner: number;
}

export interface IEvents {
  events: IEvent[];
  matchId: string;
  penalty: IPenalty[];
}

export interface IEvent {
  eventId: string;
  minute: string;
  type: number;
  playerId: string;
  playerName: string;
  assistPlayerId: string | null; // Assuming assistPlayerId could be empty
  homeEvent: boolean;
  overtime: string;
}

export interface IPenalty {
  eventId: string;
  homeEvent: boolean;
  playerId: string;
  playerName: string;
  homeScore: number;
  awayScore: number;
  missed: boolean;
}

export interface IH2h {
  headTohead: [];
  homeLastMatches: [];
  awayLastMatches: [];g
}

export interface Information {
  field: string,
  referee: string,
  temperature: string,
  weather: string,
  wind: string,
  humidity: string,
  rain: string,
}

export interface IStatus {
  long: string;
  short: string;
  elapsed: number;
}

// export interface ILeague {
//   id: number;
//   name: string;
//   country: string;
//   logo: string;
//   flag: string;
//   season: number;
//   round: string;
// }

export interface IGoals {
  home: number;
  away: number;
}
export interface ILineup {
  home: ILineupItem;
  away: ILineupItem;
}

export interface ITeam {
  home: IItemTeam;
  away: IItemTeam;
}
export interface IItemTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
}

export interface IScore {
  halftime: IGoals;
  fulltime: IGoals;
  extratime: IGoals;
  penalty: IGoals;
}

export interface IEvent {
  eventId: string;
  minute: string;
  type: number;
  playerId: string;
  playerName: string;
  assistPlayerId: string | null; // Assuming assistPlayerId could be empty
  homeEvent: boolean;
  overtime: string;
}

export interface ITimeEvent {
  elapsed: number;
  extra: number;
}

export interface IPlayer {
  id: number;
  name: string;
  number: number;
  pos: string;
  birthday: Date;
  height: number;
  weight: number;
  photo: string;
  origin: string
}

export interface ILineupItem {
  team: IItemTeam;
  coach: ICoach;
  startIX: IPlayer[];
  substitutes: IPlayer[];
  formation: string;
}

export interface ICoach {
  id: number;
  name: string;
}

export interface IOdd {
  id: number;
  name: string;
  bets: IBet[];
}

export interface IBet {
  id: number;
  name: string;
  values: IValue[];
}

export interface IValue {
  value: string;
  odd: string;
}

export interface IFilter {
  selectedLeagues: number,
  selectedCountries: string,
  textSearch: string,
}
