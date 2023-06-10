import { Player } from "./character.js";
import { InputHandler } from "./userInput.js";
import { Scene } from "./scene.js";


window.addEventListener('load', function(){
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 500;


class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.platformHeight = 50;
        this.speed = 0;
        //instantiation of folowing classes
        this.scene = new Scene(this); 
        this.player = new Player(this);
        this.input = new InputHandler();
    }

    //runs for every animationframe
    update(dTime){

        this.scene.update();
        this.player.update(this.input.keys, dTime);
    }

    //draws images from index.html
    draw(context){
        this.scene.draw(context);
        this.player.draw(context);

    }
}

    //instantiation of game class 
    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let lastTime = 0;


    function animate(timeStamp){
        const dTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(dTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});