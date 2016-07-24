window.App = window.App || {};

/**
 * Initialization process
 */
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
    App.foodSpawned = false;

    // Ants Settings
    App.ants = [];

    // Red Ant
    App.redAntImgReady = false;
    App.redAntImg = new Image();
    App.redAntImg.onload = function() {
        App.redAntImgReady = true;
    }

    App.redAntImg.src = RED_ANT;

    // Orange Ant
    App.orangeAntImgReady = false;
    App.orangeAntImg = new Image();
    App.orangeAntImg.onload = function() {
        App.orangeAntImgReady = true;
    }

    App.orangeAntImg.src = ORANGE_ANT;
    console.log(App.orangeAntImgReady);

    // Black Ant
    App.blackAntImgReady = false;
    App.blackAntImg = new Image();
    App.blackAntImg.onload = function() {
        App.blackAntImgReady = true;
    }

    App.blackAntImg.src = BLACK_ANT;

    // Ants target
    App.antsTarget = null;
}

/**
 * Redraw the canvas
 */
App.update = function() {
    //Clear Canvas
    App.ctx.fillStyle = "grey";
    App.ctx.fillRect(0, 0, App.stage.width , App.stage.height);

    // Spawning of food
    if(!App.foodSpawned){
        App.spawnFood(3);
    }

    if(App.food.length) {
        for(var i = 0; i < App.food.length; i++) {
            App.drawFood(App.food[i]);
        }
    }

    // Spawn Ants
    if(!App.spawningAnt) {
         App.spawningAnt = true;
         setTimeout(App.spawnAnt, 2000);
    }

    if(App.ants.length) {
        for(var i = 0; i < App.ants.length; i++) {
            App.ants[i] = App.drawAnt(App.ants[i]);
        }
    }
}

/**
 * Ant Class
 */
App.Ant = function(){
    this.image = '';
    this.position = {
        x : 0,
        y : 0
    };
    this.speed = 0;
    this.points = 0;
}

/**
 * Spawn Ant
 */
App.spawnAnt = function() {
    var rand = Math.random() * 100;
    var ant = new App.Ant();

    if(rand < RED_P) {
        ant.image = App.redAntImg;
        ant.speed = RED_SPEED;
        ant.points = 1;
    } else if(rand > RED_P && rand <= BLACK_P) {
        ant.image = App.blackAntImg;
        ant.speed = BLACK_SPEED;
        ant.points = 5;
    } else if(rand > BLACK_P) {
        ant.image = App.orangeAntImg;
        ant.speed = ORANGE_SPEED;
        ant.points = 3;
    }

    ant.position.x = 50;
    ant.position.y = -10;

    App.ants.push(ant);
    App.spawningAnt = false;
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

    App.foodSpawned = true;
}

/**
 * Draw Food
 */
App.drawFood = function(object) {
    App.ctx.drawImage(object.image, object.position.x, object.position.y);
}

App.drawAnt = function(object) {
    App.ctx.drawImage(object.image, object.position.x, object.position.y);

    // Choose the food
    if(App.antsTarget === null && App.food.length) {
        var nearest = 0;
        if(App.food.length > 2) {
            for(var i = 1; i < App.food.length; i++) {
                var distanceFromNearest = object.position.y - App.food[nearest];
                var distanceFromCurrent = object.position.y - App.food[i];

                if(Math.abs(distanceFromNearest) > Math.abs(distanceFromCurrent)) {
                    nearest = i;
                }
            }

            App.antsTarget = nearest;
        }
    }

    // Chase the food
    var speed = object.speed;
    if(App.antsTarget !== null) {
        var distance = object.position.x - App.food[App.antsTarget].position.x;
        console.log(distance);
        if(distance < 0 && object.speed <= 0) {
            speed *= -1;
            console.log('test1');
        } else if(distance > 0 && object.speed >= 0){
            speed *= -1;
            console.log('test2');
        } else if(distance == 0 && object.speed !== 0) {
            speed = 0;
            console.log('test');
        }
    }

    // Object position
    object.position.x += speed;
    object.position.y += object.speed;

    return object;
}
