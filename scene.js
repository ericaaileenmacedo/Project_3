class Layer{
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    update(){
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        
    }


}


export class Scene {
    constructor(game){
        this.game = game;
        this.width = 1667;
        this.height = 500;
    
        this.back = document.getElementById('backgroundScene');
        this.platform = document.getElementById('walkingScene');

        this.backgroundScene = new Layer(this.game, this.width, this.height, .5, this.back);
        this.walkingScene = new Layer(this.game, this.width, this.height, 1, this.platform);

        this.sceneLayers = [this.backgroundScene, this.walkingScene];
    }



    update(){
        this.sceneLayers.forEach(layer => {
            layer.update();
        })
    }



    draw(context){
        this.sceneLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}

