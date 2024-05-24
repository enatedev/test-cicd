import { I18n } from "react-redux-i18n"
export const RESOURCE_URL = 'https://cdn.jsdelivr.net/gh/hptaikhoandev/oddsTableCdn@v2.0.2/odds-table-vip/';

export const LOCALE = {
    VI: 'vi',
    TH: 'th'
}

export const API_KEY = 'OmglezmZnzTkNqzJ'

export const BASE_URL = 'https://v1.tylekeo99.com'

export const VIEW_FIXTURE_BUTTON = [
    {
        text: 'Phân tích chi tiết',
    }
]

export const EVENT_TYPE_NOTED = [
    {
        text: 'goal',
        url: RESOURCE_URL + 'goal.png'
    },
    {
        text: 'own_goal',
        url: RESOURCE_URL + 'own-goal.png'
    },
    {
        text: 'penalty',
        url: RESOURCE_URL + 'penalty.png'
    },
    {
        text: 'miss_penalty',
        url: RESOURCE_URL + 'missed-penalty.png'
    },
    {
        text: 'assist',
        url: RESOURCE_URL + 'support.png'
    },
    {
        text: 'yellow_card',
        url: RESOURCE_URL + 'yellow-card.png'
    },
    {
        text: 'red_card',
        url: RESOURCE_URL + 'red-card.png'
    },
    {
        text: 'second_yellow_card',
        url: RESOURCE_URL + 'double-yellow-card.png'
    },
    {
        text: 'substitution',
        url: RESOURCE_URL + 'thaynguoi.png'
    },
    {
        text: 'var',
        url: RESOURCE_URL + 'var.png'
    },
]

export const STATISTICS = {
    full_match: [
        {
            "type": 6,
            "home": "9",
            "away": "9"
        },
        {
            "type": 45,
            "home": "4",
            "away": "6"
        },
        {
            "type": 11,
            "home": "3",
            "away": "3"
        },
        {
            "type": 3,
            "home": "17",
            "away": "21"
        },
        {
            "type": 4,
            "home": "8",
            "away": "8"
        },
        {
            "type": 34,
            "home": "5",
            "away": "8"
        },
        {
            "type": 37,
            "home": "4",
            "away": "5"
        },
        {
            "type": 8,
            "home": "10",
            "away": "16"
        },
        {
            "type": 14,
            "home": "44%",
            "away": "56%"
        },
        {
            "type": 46,
            "home": "42%",
            "away": "58%"
        },
        {
            "type": 41,
            "home": "365",
            "away": "439"
        },
        {
            "type": 42,
            "home": "78%",
            "away": "83%"
        },
        {
            "type": 5,
            "home": "16",
            "away": "7"
        },
        {
            "type": 9,
            "home": "1",
            "away": "2"
        },
        {
            "type": 15,
            "home": "27",
            "away": "25"
        },
        {
            "type": 36,
            "home": "15",
            "away": "11"
        },
        {
            "type": 16,
            "home": "6",
            "away": "5"
        },
        {
            "type": 38,
            "home": "16",
            "away": "13"
        },
        {
            "type": 29,
            "home": "4",
            "away": "4"
        },
        {
            "type": 39,
            "home": "5",
            "away": "8"
        },
        {
            "type": 40,
            "home": "14",
            "away": "14"
        },
        {
            "type": 19,
            "home": "16",
            "away": "13"
        },
        {
            "type": 20,
            "home": "13",
            "away": "3"
        },
        {
            "type": 23,
            "home": "2",
            "away": "1"
        },
        {
            "type": 0,
            "home": "",
            "away": "*"
        },
        {
            "type": 2,
            "home": "",
            "away": "*"
        },
        {
            "type": 31,
            "home": "*",
            "away": ""
        },
        {
            "type": 25,
            "home": "",
            "away": "*"
        },
        {
            "type": 26,
            "home": "*",
            "away": ""
        },
        {
            "type": 43,
            "home": "81",
            "away": "80"
        },
        {
            "type": 44,
            "home": "48",
            "away": "64"
        }
    ],
    first_half: [
        {
            title: 'Kiểm soát bóng',
            home:70,
            away:30,
        },
        {
            title: 'Sút trúng mục tiêu',
            home:7,
            away:6,
        },
        {
            title: 'Sút không trúng mục tiêu',
            home:2,
            away:1,
        },
        {
            title:'Thủ môn cản phá',
            home:2,
            away:2,
        },
        {
            title: 'Phạt góc',
            home:2,
            away:3,
        },
        {
            title: 'Lỗi',
            home:4,
            away:5,
        },
        {
            title:'Thẻ vàng',
            home:9,
            away:5,
        },
        {
            title: 'Thẻ đỏ',
            home:0,
            away:5,
        },
    ],
    second_half: [
        {
            title: 'Kiểm soát bóng',
            home:40,
            away:60,
        },
        {
            title: 'Sút trúng mục tiêu',
            home:3,
            away:5,
        },
        {
            title: 'Sút không trúng mục tiêu',
            home:6,
            away:5,
        },
        {
            title:'Thủ môn cản phá',
            home:2,
            away:3,
        },
        {
            title: 'Phạt góc',
            home:2,
            away:5,
        },
        {
            title: 'Lỗi',
            home:2,
            away:5,
        },
        {
            title:'Thẻ vàng',
            home:2,
            away:3,
        },
        {
            title: 'Thẻ đỏ',
            home:2,
            away:9,
        },
    ]
}



export const FIXTURE_INFORMATIONS = [
    'Anfield, Liverpool, UK',
    'Lorem Ipsum',
    '60°F / 15°C',
    '🌥️ Nhiều Mây',
    '10/mph',
    '65%',
    '20%',
]

export const EVENT_MAPPING = {
    1: {
        name: "Goal",
        // iconImgLink: 'http://bongdaso66.net/img/ball.gif'
        iconImgLink: 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/images/goal.svg'
    },
    2: {
        name: "Red card",
        iconImgLink: 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/images/red_card.svg'
    },
    3: {
        name: "Yellow card",
        iconImgLink: 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/images/yellow_card.svg'
    },
    7: {
        name: "Penalty scored",
        iconImgLink: 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/images/penalty.svg'
    },
    8: {
        name: "Own goal",
        // Add your iconImgLink here if available
    },
    9: {
        name: "Second yellow card",
        // Add your iconImgLink here if available
    },
    11: {
        name: "Substitution",
        // iconImgLink: 'http://bongdaso66.net/img/subs2.gif'
        iconImgLink: 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/images/thay_nguoi.svg'
    },
    13: {
        name: "Penalty missed",
        // Add your iconImgLink here if available
    },
    14: {
        name: "Video Referee (VR Referee)",
        // Add your iconImgLink here if available
    }
};

export const LEAGUES = [
    {
        id: 13014,
        name: 'UEFA Champions League'
    },
    {
        id: 1099,
        name: 'England FA Cup'
    },
    {
        id: 1639,
        name: 'Premier League'
    },
    {
        id: 1437,
        name: 'Italian Serie A'
    },
    {
        id: 1134,
        name: 'Spanish La Liga'
    },
    {
        id: 188,
        name: 'German Bundesliga'
    },
    {
        id: 1112,
        name: 'France Ligue 1'
    },
    {
        id: 1145,
        name: 'International Club Friendly'
    },

]


export const BET_NOW_URL = 'https://net88.com/?register=true';

export const BOOKMARKERS = [
    {
      image: RESOURCE_URL + 'sbotop.png',
      name: "Sbotop",
      width: 44,
      height: 10,
      id: 1
    },
    {
      image: RESOURCE_URL + 'bet365.png',
      name: "bet365",
      width: 39,
      height: 14,
      id: 8
    },
    {
      image: RESOURCE_URL +'w88.png',
      name: "W88",
      width: 26,
      height: 15,
      id: 4,
    },
    {
      image: RESOURCE_URL + '1xbet.png',
      name: "1xBet",
      width: 34,
      height: 7,
      id: 7,
    },
    {
      image: RESOURCE_URL + 'm88.png',
      name: "M88",
      width: 32,
      height: 13,
    id: 3
    },
];

export const TEAM_FAVORITE_RED_ICON_URL = 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/odds-table-vip/red-favorite.svg'

export const TEAM_FAVORITE_GRAY_ICON_URL = 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/odds-table-vip/gray-favorite.svg'

export const FAVORITE_RED_ICON_URL = 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/odds-table-vip/favouriteRed.svg'

export const FAVORITE_BLACK_ICON_URL = 'https://raw.githubusercontent.com/hptaikhoandev/oddsTableCdn/main/odds-table-vip/favouriteBlack.svg'

export const ODDS_DISPLAY_TYPE = [
    {
      name: "CN",
    },
    {
      name: "DEC",
    },
    {
      name: "HK",
    },
    {
      name: "MAL",
    },
    {
      name: "INDO",
    },
];
