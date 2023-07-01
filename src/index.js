import { createGame, getScores, addScore } from './modules/api.js';
import './style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const refreshButton = document.querySelector('.button');
  const submitButton = document.querySelector('.submit-b');
  const nameInput = document.getElementById('user_name');
  const scoreInput = document.getElementById('user_score');
  const scoresTable = document.querySelector('.border');

  let gameId;

  const displayScores = async () => {
    try {
      const scores = await getScores(gameId);

      scoresTable.innerHTML = '';

      if (scores.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = 'No scores available';
        row.appendChild(cell);
        scoresTable.appendChild(row);
      } else {
        scores.forEach((score, index) => {
          const row = document.createElement('tr');
          const cell = document.createElement('td');
          cell.textContent = `${index + 1}. ${score.user}: ${score.score}`;
          row.appendChild(cell);
          scoresTable.appendChild(row);
        });
      }
    } catch (error) {
      console.error('Error retrieving scores:', error);
    }
  };

  const addScoreHandler = async (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const score = parseInt(scoreInput.value, 10);

    if (!name || !score) {
      alert('Please enter both name and score.');
      return;
    }

    try {
      await addScore(gameId, name, score);
      alert('Score submitted successfully.');
      nameInput.value = '';
      scoreInput.value = '';
    } catch (error) {
      console.error('Error adding score:', error);
    }
  };

  refreshButton.addEventListener('click', displayScores);
  submitButton.addEventListener('click', addScoreHandler);

  try {
    gameId = await createGame('Your Game Name');
    console.log('Game created. ID:', gameId);
  } catch (error) {
    console.error('Error creating game:', error);
  }
});
