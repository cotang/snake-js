export default class Food{
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
