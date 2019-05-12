import style from './style.css';

class SnakeGame{
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


class Snake{
  constructor(){
    this.snakeBody = [];
    this.direction = 'r';
    this.speed = 0;
    this.allowedToChangeDirection = true;
  }
  setInitialParameters(){
    this.snakeBody = [[0,2], [0,1], [0,0]];
    this.direction = 'r';
    this.speed = 600;
  }
  setDirection(keyCode){
    if (this.allowedToChangeDirection){
      switch (keyCode) {
      case 38:
        this.direction = this.direction == 'd' ? 'd': 'u';
        break;
      case 40:
        this.direction = this.direction == 'u' ? 'u': 'd';
        break;
      case 39:
        this.direction = this.direction == 'l' ? 'l': 'r';
        break;
      case 37:
        this.direction = this.direction == 'r' ? 'r': 'l';
        break;
      }
      this.allowedToChangeDirection = false;
    }
  }
  move(context){
    switch (this.direction) {
    case 'r':
      this.updateSnakePosition(0,1,context);
      break;
    case 'l':
      this.updateSnakePosition(0,-1,context);
      break;
    case 'u':
      this.updateSnakePosition(-1,0,context);
      break;
    case 'd':
      this.updateSnakePosition(1,0,context);
      break;
    }
  }
  addSpeed(){
    if (this.speed>200){
      this.speed-=100;
    }
  }
  updateSnakePosition(x,y,context){
    const snakeHead = [this.snakeBody[0][0]+x, this.snakeBody[0][1]+y];
    this.snakeBody.unshift(snakeHead);
    // если змейка достигла границ или саму себя
    if (this.reachedBorders(context) || this.reachedItself()){
      context.stopGame();
    // если змейка съела еду
    } else if (this.reachedFood(context)) {
      context.addScore();
      this.addSpeed();
      this.render();
      context.food.render(context);
    // обычный шаг
    } else {
      this.snakeBody.pop();
      this.render();
    }
    this.allowedToChangeDirection = true;
  }
  
  reachedBorders(context){
    return this.snakeBody[0][0]<0 || this.snakeBody[0][0]>=context.gridSize || 
    this.snakeBody[0][1]<0 || this.snakeBody[0][1]>=context.gridSize;
  }
  reachedItself(){
    return this.snakeBody.slice(1).some(el=>{
      return el[0]==this.snakeBody[0][0] && el[1]==this.snakeBody[0][1];
    });
  }
  reachedFood(context){
    return this.snakeBody[0][0] == context.food.coords[0] && 
    this.snakeBody[0][1] == context.food.coords[1]; 
  }
  
  render(){ 
    document.querySelectorAll('.cell').forEach((cell)=>{
      cell.classList.remove('snake');
    });
    this.snakeBody.forEach((bodyPiece) => {
      const snakeCell = document.querySelector(`[data-coord="${bodyPiece[0]},${bodyPiece[1]}"]`);
      snakeCell.classList.add('snake');
    });
  }
}


class Food{
  constructor(){
    this.coords = [];
  }
  defineCoords(context){
    this.coords = [
      Math.floor(Math.random() * context.gridSize), 
      Math.floor(Math.random() * context.gridSize)
    ];
    if ( this.cellIsTaken(context) ) {
      this.defineCoords(context);  
    }
  }
  cellIsTaken(context){
    return context.snake.snakeBody.some(el=>{
      return el[0]==this.coords[0] && el[1]==this.coords[1];
    });
  }
  render(context){
    this.defineCoords(context);
    if (document.querySelector('.food')){
      document.querySelector('.food').classList.remove('food');
    }
    const foodCell = document.querySelector(`[data-coord="${this.coords[0]},${this.coords[1]}"]`);
    foodCell.classList.add('food');
  }
}


const game = new SnakeGame();
game.renderGrid();
document.getElementById('play').addEventListener('click', () => game.startGame());
