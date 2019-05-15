import style from './style.css';
import SnakeGame from './components/SnakeGame.js';

const game = new SnakeGame();
game.renderGrid();
document.getElementById('play').addEventListener('click', () => game.startGame());
