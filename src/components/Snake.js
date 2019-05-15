export default class Snake{
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