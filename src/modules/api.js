const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

export const createGame = async (name) => {
  const response = await fetch(`${BASE_URL}/games/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  const data = await response.json();
  return data.result.split(' ')[3];
};

export const getScores = async (gameId) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}/scores`);
  const data = await response.json();
  return data.result;
};

export const addScore = async (gameId, user, score) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, score }),
  });

  const data = await response.json();
  return data.result;
};
