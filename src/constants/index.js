// src/constants/index.js

export const API_ROOT =                 'http://localhost:3005/api/v1';

export const HEADERS = {
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json',
};

export const JWT_URL =                  `${API_ROOT}/token`
export const LOGIN_URL =                `${API_ROOT}/login`
export const REGISTER_URL =             `${API_ROOT}/players`
export const DEAL_UPDATE_URL =          `${API_ROOT}/deals`
export const ALL_OTHER_PLAYERS_URL =    `${API_ROOT}/games/available_players`
export const NEW_GAME_URL =             `${API_ROOT}/games/new`

export const REFRESH_RATE =             5000


export const DECK = {
            "2C": {
                ord: 0,
                name: "2 Clubs",
                short: "2C",
                uni: "2♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/4/42/2_of_clubs.svg"
            },
            "3C": {
                ord: 1,
                name: "3 Clubs",
                short: "3C",
                uni: "3♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/3_of_clubs.svg"
            },
            "4C": {
                ord: 2,
                name: "4 Clubs",
                short: "4C",
                uni: "4♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/4_of_clubs.svg"
            },
            '5C': {
                ord: 3,
                name: "5 of Clubs",
                short: "5C",
                uni: "5♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/7/72/5_of_clubs.svg"
            },
            '6C': {
                ord: 4,
                name: "6 of Clubs",
                short: "6C",
                uni: "6♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/4/49/6_of_clubs.svg"
            },
            '7C': {
                ord: 5,
                name: "7 of Clubs",
                short: "7C",
                uni: "7♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/d/db/7_of_clubs.svg"
            },
            '8C': {
                ord: 6,
                name: "8 of Clubs",
                short: "8C",
                uni: "8♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/5/54/8_of_clubs.svg"
            },
            '9C': {
                ord: 7,
                name: "9 of Clubs",
                short: "9C",
                uni: "9♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/6/67/9_of_clubs.svg"
            },
            '10C': {
                ord: 8,
                name: "10 of Clubs",
                short: "10C",
                uni: "10♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/c/c9/10_of_clubs.svg"
            },
            'JC': {
                ord: 9,
                name: "Jack of Clubs",
                short: "JC",
                uni: "J♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Jack_of_clubs2.svg"
            },
            "QC": {
                ord: 10,
                name: "Queen of Clubs",
                short: "QC",
                uni: "Q♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Queen_of_clubs2.svg"
            },
            'KC': {
                ord: 11,
                name: "King of Clubs",
                short: "KC",
                uni: "K♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/King_of_clubs2.svg"
            },
            'AC': {
                ord: 12,
                name: "Ace of Clubs",
                short: "AC",
                uni: "A♣",
                img: "https://upload.wikimedia.org/wikipedia/commons/6/61/Ace_of_clubs.svg"
            },
            '2D': {
                ord: 13,
                name: "2 of Diamonds",
                short: "2D",
                uni: "2♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/2_of_diamonds.svg"
            },
            '3D': {
                ord: 14,
                name: "3 of Diamonds",
                short: "3D",
                uni: "3♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/5/50/3_of_diamonds.svg"
            },
            '4D': {
                ord: 15,
                name: "4 of Diamonds",
                short: "4D",
                uni: "4♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/b/b8/4_of_diamonds.svg"
            },
            '5D': {
                ord: 16,
                name: "5 of Diamonds",
                short: "5D",
                uni: "5♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/5_of_diamonds.svg"
            },
            '6D': {
                ord: 17,
                name: "6 of Diamonds",
                short: "6D",
                uni: "6♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/3/34/6_of_diamonds.svg"
            },
            '7D': {
                ord: 18,
                name: "7 of Diamonds",
                short: "7D",
                uni: "7♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/8/83/7_of_diamonds.svg"
            },
            '8D': {
                ord: 19,
                name: "8 of Diamonds",
                short: "8D",
                uni: "8♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/8_of_diamonds.svg"
            },
            '9D': {
                ord: 20,
                name: "9 of Diamonds",
                short: "9D",
                uni: "9♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/f/f2/9_of_diamonds.svg"
            },
            '10D': {
                ord: 21,
                name: "10 of Diamonds",
                short: "10D",
                uni: "10♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/f/f3/10_of_diamonds.svg"
            },
            'JD': {
                ord: 22,
                name: "Jack of Diamonds",
                short: "JD",
                uni: "J♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/8/80/Jack_of_diamonds2.svg"
            },
            'QD': {
                ord: 23,
                name: "Queen of Diamonds",
                short: "QD",
                uni: "Q♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Queen_of_diamonds2.svg"
            },
            'KD': {
                ord: 24,
                name: "King of Diamonds",
                short: "KD",
                uni: "K♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/c/c6/King_of_diamonds2.svg"
            },
            'AD': {
                ord: 25,
                name: "Ace of Diamonds",
                short: "AD",
                uni: "A♢",
                img: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Ace_of_diamonds.svg"
            },
            '2H': {
                ord: 26,
                name: "2 of Hearts",
                short: "2H",
                uni: "2♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/3/39/2_of_hearts.svg"
            },
            '3H': {
                ord: 27,
                name: "3 of Hearts",
                short: "3H",
                uni: "3♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/5/5d/3_of_hearts.svg"
            },
            '4H': {
                ord: 28,
                name: "4 of Hearts",
                short: "4H",
                uni: "4♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/4_of_hearts.svg"
            },
            '5H': {
                ord: 29,
                name: "5 of Hearts",
                short: "5H",
                uni: "5♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/a/a1/5_of_hearts.svg"
            },
            '6H': {
                ord: 30,
                name: "6 of Hearts",
                short: "6H",
                uni: "6♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/6_of_hearts.svg"
            },
            '7H': {
                ord: 31,
                name: "7 of Hearts",
                short: "7H",
                uni: "7♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/7_of_hearts.svg"
            },
            '8H': {
                ord: 32,
                name: "8 of Hearts",
                short: "8H",
                uni: "8♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/8_of_hearts.svg"
            },
            '9H': {
                ord: 33,
                name: "9 of Hearts",
                short: "9H",
                uni: "9♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/9_of_hearts.svg"
            },
            '10H': {
                ord: 34,
                name: "10 of Hearts",
                short: "10H",
                uni: "10♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/a/ad/10_of_hearts.svg"
            },
            'JH': {
                ord: 35,
                name: "Jack of Hearts",
                short: "JH",
                uni: "J♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/3/34/Jack_of_hearts2.svg"
            },
            'QH': {
                ord: 36,
                name: "Queen of Hearts",
                short: "QH",
                uni: "Q♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Queen_of_hearts2.svg"
            },
            'KH': {
                ord: 37,
                name: "King of Hearts",
                short: "KH",
                uni: "K♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/0/06/King_of_hearts2.svg"
            },
            'AH': {
                ord: 38,
                name: "Ace of Hearts",
                short: "AH",
                uni: "A♡",
                img: "https://upload.wikimedia.org/wikipedia/commons/0/07/Ace_of_hearts.svg"
            },
            '2S': {
                ord: 39,
                name: "2 of Spades",
                short: "2S",
                uni: "2♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/2_of_spades.svg"
            },
            '3S': {
                ord: 40,
                name: "3 of Spades",
                short: "3S",
                uni: "3♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/e/eb/3_of_spades.svg"
            },
            '4S': {
                ord: 41,
                name: "4 of Spades",
                short: "4S",
                uni: "4♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/a/a4/4_of_spades.svg"
            },
            '5S': {
                ord: 42,
                name: "5 of Spades",
                short: "5S",
                uni: "5♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/5_of_spades.svg"
            },
            '6S': {
                ord: 43,
                name: "6 of Spades",
                short: "6S",
                uni: "6♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/6_of_spades.svg"
            },
            '7S': {
                ord: 44,
                name: "7 of Spades",
                short: "7S",
                uni: "7♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/f/f7/7_of_spades.svg"
            },
            '8S': {
                ord: 45,
                name: "8 of Spades",
                short: "8S",
                uni: "8♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/4/40/8_of_spades.svg"
            },
            '9S': {
                ord: 46,
                name: "9 of Spades",
                short: "9S",
                uni: "9♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/6/63/9_of_spades.svg"
            },
            '10S': {
                ord: 47,
                name: "10 of Spades",
                short: "10S",
                uni: "10♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/6/68/10_of_spades.svg"
            },
            'JS': {
                ord: 48,
                name: "Jack of Spades",
                short: "JS",
                uni: "J♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Jack_of_spades2.svg"
            },
            'QS': {
                ord: 49,
                name: "Queen of Spades",
                short: "QS",
                uni: "Q♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Queen_of_spades2.svg"
            },
            'KS': {
                ord: 50,
                name: "King of Spades",
                short: "KS",
                uni: "K♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/2/22/King_of_spades2.svg"
            },
            'AS': {
                ord: 51,
                name: "Ace of Spades",
                short: "AS",
                uni: "A♠",
                img: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Ace_of_spades2.svg"
            }
        }
