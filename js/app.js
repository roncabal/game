window.App = window.App || {};

App.init = function() {
    App.setup();
    console.log(App.browser);
}

/**
 * All Initial setup
 */
App.setup = function() {
    App.browser = App.sayswho();

    // Canvas Settings
    App.setCanvas();

    // Run the game
    App.game = setInterval(App.update, TIME_PER_FRAME);
}

/**
 * Determine the browser
 */
App.sayswho = function() {
    var N = navigator.appName, ua= navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!=null) M[2]=tem[1];
    M = M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    if(M[0] == "Firefox")
        return "f";
    else if(M[0] == "Chrome")
        return "c";
    else if(M[0] == "Safari")
        return "s";
    else if(M[0] == "Microsoft")
        return "m";
    else
        return "f";
}

/**
 * Create the canvas and fill the settings
 */
App.setCanvas = function() {
    App.stage = document.getElementById("gameCanvas");
    App.stage.width = STAGE_WIDTH;
    App.stage.height = STAGE_HEIGHT;

    App.ctx = App.stage.getContext("2d");
    App.ctx.fillStyle = "grey";
    App.ctx.font = GAME_FONTS;

    // Food settings
    App.food = [];

    App.foodImgReady = false;
    App.foodImg = new Image();
    App.foodImg.onload = function() {
        App.foodImgReady = true;
    }
    App.foodImg.src = FOOD_IMG;
}

/**
 * Redraw the canvas
 */
App.update = function() {
    //Clear Canvas
    App.ctx.fillStyle = "grey";
    App.ctx.fillRect(0, 0, App.stage.width , App.stage.height);

    // Spawning of food
    App.spawnFood(3);

    if(App.food.length) {
        for(var i = 0; i < App.food.length; i++) {
            App.drawFood(App.food[i]);
        }
    }

    // Spawn Ants
}

/**
 * Ant Class
 */
App.Ant = {
    image : '',
    speed : {
        x : 0,
        y : 0
    },
    points : 0
}

/**
 * Spawn Ant
 */
App.spawnAnt = function() {
    var rand = Math.random() * 100;

    if(rand < RED_P) {

    } else if(rand > RED_P && rand <= BLACK_P) {

    } else if(rand > ORANGE_P) {

    }
}

App.Food = function(){
    this.image = App.foodImg;
    this.position = {
        x : 0,
        y : 0
    };
};

App.spawnFood = function(count) {
    for(var i = 0; i < count; i++) {
        var food = new App.Food();
        food.position.x = 100 + (100 * i);
        food.position.y = 300;

        App.food.push(food);
    }
}

/**
 * Draw Food
 */
App.drawFood = function(object) {
    App.ctx.drawImage(object.image, object.position.x, object.position.y);
}

App.drawAnt = function() {

}
