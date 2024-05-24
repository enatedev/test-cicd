import {
  IFixture,
  IStatus,
  IEvent,
  ILineup,
  ITeam,
  IItemTeam,
  IScore,
  IGoals,
  ILeague,
  IOdd,
  ICoach,
  IPlayer,
  ILineupItem,
  Information,
  IFixtures,
  IFilter
} from "../interfaces";
import { LEAGUES } from "../../utils/contants";

const initialStatus: IStatus = {
  long: "",
  short: "",
  elapsed: 0,
};

const initialItemTeam: IItemTeam = {
  id: 0,
  name: "aaaa",
  logo: "",
  winner: false,
};

const initialTeam: ITeam = {
  home: initialItemTeam,
  away: initialItemTeam,
};

const initalGoals: IGoals = {
  home: 0,
  away: 0,
};

const initalScore: IScore = {
  halftime: initalGoals,
  fulltime: initalGoals,
  extratime: initalGoals,
  penalty: initalGoals,
};

const initialEvents: IEvent[] = [
  {
    "eventId": "11899911",
    "minute": "21",
    "type": 1,
    "playerId": "102096",
    "playerName": "Leandro Trossard (Assist:Kai Havertz)",
    "assistPlayerId": "147555",
    "overtime": "0",
    "homeEvent": false
  },
  {
    "eventId": "11900700",
    "minute": "66",
    "type": 11,
    "playerId": "168935",
    "playerName": "Gabriel Teodoro Martinelli Silva↑Leandro Trossard↓",
    "assistPlayerId": "102096",
    "overtime": "0",
    "homeEvent": false
  },
  {
    "eventId": "11900722",
    "minute": "70",
    "type": 11,
    "playerId": "173359",
    "playerName": "Antony Matheus dos Santos↑Amad Diallo Traore↓",
    "assistPlayerId": "201350",
    "overtime": "0",
    "homeEvent": true
  },
  {
    "eventId": "11900732",
    "minute": "71",
    "type": 3,
    "playerId": "171322",
    "playerName": "Bukayo Saka",
    "assistPlayerId": "171322",
    "overtime": "0",
    "homeEvent": false
  },
  {
    "eventId": "11900756",
    "minute": "75",
    "type": 11,
    "playerId": "202340",
    "playerName": "Willy Kambwala↑Jonny Evans↓",
    "assistPlayerId": "25713",
    "overtime": "0",
    "homeEvent": true
  },
  {
    "eventId": "11900829",
    "minute": "82",
    "type": 11,
    "playerId": "131976",
    "playerName": "Gabriel Fernando de Jesus↑Bukayo Saka↓",
    "assistPlayerId": "171322",
    "overtime": "0",
    "homeEvent": false
  },
  {
    "eventId": "11900895",
    "minute": "87",
    "type": 11,
    "playerId": "240983",
    "playerName": "Omari Forson↑Aaron Wan-Bissaka↓",
    "assistPlayerId": "150386",
    "overtime": "0",
    "homeEvent": true
  },
  {
    "eventId": "11900893",
    "minute": "87",
    "type": 11,
    "playerId": "70171",
    "playerName": "Christian Eriksen↑Sofyan Amrabat↓",
    "assistPlayerId": "127036",
    "overtime": "0",
    "homeEvent": true
  },
  {
    "eventId": "11900897",
    "minute": "88",
    "type": 11,
    "playerId": "244405",
    "playerName": "Ethan Wheatley↑Rasmus Hojlund↓",
    "assistPlayerId": "201304",
    "overtime": "0",
    "homeEvent": true
  },
  {
    "eventId": "11900955",
    "minute": "90",
    "type": 3,
    "playerId": "119086",
    "playerName": "David Raya",
    "assistPlayerId": "",
    "overtime": "3",
    "homeEvent": false
  },
  {
    "eventId": "11900937",
    "minute": "90",
    "type": 11,
    "playerId": "142267",
    "playerName": "Jorge Luiz Frello Filho,Jorginho↑Martin Odegaard↓",
    "assistPlayerId": "123667",
    "overtime": "2",
    "homeEvent": false
  },
  {
    "eventId": "11900936",
    "minute": "90",
    "type": 11,
    "playerId": "174939",
    "playerName": "Jakub Kiwior↑Thomas Partey↓",
    "assistPlayerId": "124473",
    "overtime": "2",
    "homeEvent": false
  }
];


const initalCoach: ICoach = {
  id: 0,
  name: ''
}

const initalPlayer: IPlayer = {
  id: 1,
  name: "John Doe",
  number: 10,
  pos: "Forward",
  birthday: new Date("1992-04-12"),
  height: 182,
  weight: 75,
  photo: "https://example.com/photo.jpg",
  origin: ""
}

const initalLineupItem: ILineupItem = {
  team: initialItemTeam,
  coach: initalCoach,
  startIX: [initalPlayer],
  substitutes: [initalPlayer],
  formation: '4321'
}

const initialLineup: ILineup = {
  home: initalLineupItem,
  away: initalLineupItem
};

const initialOdds: IOdd[] = [];

const initalInformation: Information = {
  field: 'Anfield, Liverpool, UK',
  referee: 'Lorem Ipsum',
  temperature: '60°F / 15°C',
  weather: '🌥️ Nhiều Mây',
  wind: '10/mph',
  humidity: '65%',
  rain: '20%',
}
// export const initialFixture: IFixture = {
//   id: 0,
//   date: "",
//   timestamp: 1670284800,
//   status: initialStatus,
//   events: initialEvents,
//   lineups: initialLineup,
//   league: initialLeague,
//   teams: initialTeam,
//   goals: initalGoals,
//   score: initalScore,
//   odds: initialOdds,
//   information: initalInformation
// };

export const initialLeague: ILeague = {
  leagueId: '0',
  name: '',
  country: '',
  countryLogo: '',
  logo: '',
  shortName: '',
  subLeagueName: '',
  type: 0,
  fixtures: [],
  favoriteFixtures: [],
}

export const initialState: IFixtures = {
  date: '2024-05-16',
  leagues: initialLeague,
}

export const searchText: String = "";

export const filter: IFilter = {
  selectedLeagues: 0,
  selectedCountries: 'Tất Cả Quốc Gia',
  textSearch: "",
}

export const oddsDisplayType: string = "CN"

export const teams = {
  favoriteTeams: [
    {
      id: 1,
      name: "Manchester United",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    }
  ],
  allTeams: [
    {
      id: 1,
      name: "Manchester United",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 2,
      name: "Liverpool",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 3,
      name: "Chelsea",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 4,
      name: "Arsenal",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 5,
      name: "Manchester City",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 6,
      name: "Tottenham Hotspur",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 7,
      name: "Juventus",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 8,
      name: "Real Madrid",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 9,
      name: "Barcelona",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 10,
      name: "Bayern Munich",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 11,
      name: "Paris Saint-Germain",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 12,
      name: "Atletico Madrid",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 13,
      name: "Inter Milan",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 14,
      name: "AC Milan",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 15,
      name: "Borussia Dortmund",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 16,
      name: "Ajax",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 17,
      name: "Sevilla",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 18,
      name: "Porto",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 19,
      name: "Benfica",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 20,
      name: "Sporting CP",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 21,
      name: "RB Leipzig",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 22,
      name: "Lazio",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 23,
      name: "Napoli",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 24,
      name: "Roma",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 25,
      name: "Leicester City",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    },
    {
      id: 26,
      name: "Everton",
      logo: "https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/home.png",
    }
  ]
}
