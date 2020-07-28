// src/constants/index.js

export const API_ROOT = 'http://localhost:3005/api/v1';

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const JWT_URL =              `${API_ROOT}/token`
export const LOGIN_URL =            `${API_ROOT}/login`
export const REGISTER_URL =         `${API_ROOT}/players`
export const DEAL_UPDATE_URL =      `${API_ROOT}/deals`
export const ALL_OTHER_PLAYERS_URL = `${API_ROOT}/games/available_players`
export const NEW_GAME_URL =         `${API_ROOT}/games/new`

export const REFRESH_RATE =         5000
