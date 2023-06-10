import { Idling, Running, Jumping, Falling } from "./spriteStates.js";


export class Player{
constructor(game){
    this.game = game;
    //sprite sheet characters dimensions
    this.width = 100;
    this.height = (350/3);
    //character position
    this.x = 0;
    this.y = this.game.height - this.height - this.game.platformHeight;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById('myCharacter');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 4;
    this.speed = 0;
    this.maxSpeed = 20;
    this.fps = 5;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.states = [new Idling(this), new Running(this), new Jumping(this), new Falling(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
}

update(input, deltaTime){

    this.currentState.handleInput(input);
    //horizontal movement
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    //vertical movement
    
   
    this.y += this.vy;
    if(!this.notJumping()) this.vy += this.weight;
    else this.vy = 0;


    //sprite animation
    if (this.frameTimer > this.frameInterval){
        this.frameTimer = 0;
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
    } else{
        this.frameTimer += deltaTime;
    }
}


draw(context){

    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

}


//check to see if already in a jump or not 
notJumping(){
    return this.y >= this.game.height - this.height - this.game.platformHeight;
}


setState(state, speed){
    this.currentState = this.states[state];
    this.game.speed = speed;
    this.currentState.enter();
}

}