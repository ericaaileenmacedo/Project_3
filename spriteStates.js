const states = {
    IDLING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State{
    constructor(state){
        this.state = state;
    }
}


export class Idling extends State{
    constructor(player){
        super('IDLING');
        this.player = player;

    }

    enter(){
        this.player.frameY = 0;
    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.player.setState(states.RUNNING, 1);
        }
    }
}


export class Running extends State{
    constructor(player){
        super('RUNNING');
        this.player = player;

    }

    enter(){
        this.player.frameY = 1;
    }
    handleInput(input){
        if(input.includes('ArrowDown')){
            this.player.setState(states.IDLING, 0);
        } else if (input.includes('ArrowUp')){
            this.player.setState(states.JUMPING, 1);
        }
    }
}

export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        if (this.player.notJumping()) this.player.vy -= 20;
        this.player.frameY = 2;
    }
    handleInput(input){
        if(this.player.vy > this.player.weight){
            this.player.setState(states.FALLING, 1);
        }
    }
}




export class Falling extends State{
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.frameY = 2;
    }
    handleInput(input){
        if(this.player.notJumping()){
            this.player.setState(states.RUNNING, 1);
        }
    }
}