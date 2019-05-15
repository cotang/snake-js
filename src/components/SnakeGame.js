import Food from './Food.js';
import Snake from './Snake.js';

export default class SnakeGame{
  constructor(){
    this.gridSize = 10;
    this.score = 0;
    this.snake = new Snake();
    this.food = new Food();
    this.snakeTimer; // таймер
    this.gameOver = false;
  }
  renderGrid(){
    const field = document.getElementById('field');
    for (let i=0;i<this.gridSize;i++){ 
      const newLine = document.createElement('div');
      newLine.classList.add('row');
      field.appendChild(newLine);
      for (let k=0;k<this.gridSize;k++){ 
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.setAttribute('data-coord', i+','+k);
        newLine.appendChild(newCell);
      }
    }
  }
  addScore(){
    this.score += 1;
    document.getElementById('score').innerHTML = this.score;
  }
  startGame(){
    // сброс геймовера
    this.gameOver = false;
    clearTimeout(this.snakeTimer);
    document.getElementById('game-over').innerHTML = '';
    // очистить счет
    this.score = 0;
    document.getElementById('score').innerHTML = this.score;
    // отрендерить змею и еду
    this.snake.setInitialParameters();
    this.snake.render();
    this.food.render(this);
    // обработчик событий стрелок
    document.addEventListener('keydown', function(event) {
      this.snake.setDirection(event.keyCode);
    }.bind(this));
    // таймер
    this.launchTimer();
  }
  launchTimer(){
    this.snakeTimer = setTimeout(function(){
      this.snake.move(this);
      if (!this.gameOver){
        this.launchTimer();
      }
    }.bind(this), this.snake.speed);
  }
  stopGame(){
    this.gameOver = true;
    clearTimeout(this.snakeTimer);
    document.getElementById('game-over').innerHTML = 'Game over';
  }
}