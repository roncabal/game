window.App = window.App || {};

/**
 * Initialization process
 */
App.init = function() {
    App.setup();
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

    // Black Ant
    App.blackAntImgReady = false;
    App.blackAntImg = new Image();
    App.blackAntImg.onload = function() {
        App.blackAntImgReady = true;
    }

    App.blackAntImg.src = BLACK_ANT;

    // Ants target
    App.antsTarget = null;

    // Score
    App.score = 0;

    // Add event listener
    App.stage.addEventListener('click', App.clickFunction);

}

App.clickFunction = function(event) {
    var x = event.offsetX,
        y = event.offsetY;

    if(App.ants !== null) {
        for(var i = 0; i < App.ants.length; i++) {
            if(
                x > App.ants[i].position.x &&
                x < App.ants[i].position.x + ACTUAL_WIDTH &&
                y > App.ants[i].position.y &&
                y <= App.ants[i].position.y + ACTUAL_HEIGHT
            ){
                App.score += App.Ant.points;
                App.ants.splice(i, 1);
                break;
            }
        }
    }
}
console.log(App.score);

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

    // Update Score
    App.ctx.fillStyle = "white";
    App.ctx.fillText(App.score, 30, 30);
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

    // Choose Ant Type
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

    // Ant's initial position
    ant.position.x = Math.random() * App.stage.width;
    ant.position.y = -10;

    // Add the new instance to the array
    App.ants.push(ant);
    App.spawningAnt = false;
}

/**
 * Food Class
 */
App.Food = function(){
    this.image = App.foodImg;
    this.position = {
        x : 0,
        y : 0
    };
};

/**
 * Spawn food
 */
App.spawnFood = function(count) {
    for(var i = 0; i < count; i++) {
        var food = new App.Food();
        food.position.x = 32 + (Math.random() * (App.stage.width - 64));
        food.position.y = 80 + (Math.random() * (App.stage.height - 145));

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

/**
 * Sort the Food by y coordinates
 */
App.sortFood = function(object) {
    for(var i = 0; i < App.food.length; i++) {
        for(var j = 0; j < (App.food.length - 1); j++) {

            if(App.food[j].position.y > App.food[j+1].position.y) {

                var hold = App.food[j];
                App.food[j] = App.food[j+1];
                App.food[j+1] = hold;
            }
        }
    }
}

/**
 * Draw Ant
 */
App.drawAnt = function(object) {
    App.ctx.drawImage(object.image, object.position.x, object.position.y);

    // Collision Detection
    if(App.antsTarget !== null) {
        App.collisionDetection(object);
    }

    // Choose the food
    if(App.antsTarget === null && App.food.length) {
        var nearest = 0;
        if(App.food.length >= 2) {
            for(var i = 1; i < App.food.length; i++) {
                var distanceFromNearest = object.position.y - App.food[nearest].position.y;
                var distanceFromCurrent = object.position.y - App.food[i].position.y;

                if(Math.abs(distanceFromNearest) > Math.abs(distanceFromCurrent)) {
                    nearest = i;
                }
            }

        }
        App.antsTarget = nearest;
    }

    // Chase the food
    var speed = App.determineSpeed(object);

    // Object position
    object.position.x += speed.x;
    object.position.y += speed.y;

    return object;
}

/**
 * Determine the speed of the ant
 */
App.determineSpeed = function(object) {
    var speed = {
        x : object.speed,
        y : object.speed
    };
    if(App.antsTarget !== null) {
        var distanceX = object.position.x - App.food[App.antsTarget].position.x;
        var distanceY = object.position.y - App.food[App.antsTarget].position.y;

        // Determine X speed
        if(distanceX < 0 && object.speed <= 0) {
            speed.x *= -1;
        } else if(distanceX > 0 && object.speed >= 0){
            speed.x *= -1;
        } else if(distanceX == 0 && object.speed !== 0) {
            speed.x = 0;
        }

        // Determine Y speed
        if(distanceY < 0 && object.speed <= 0) {
            speed.y *= -1;
        } else if(distanceY > 0 && object.speed >= 0){
            speed.y *= -1;
        } else if(distanceY == 0 && object.speed !== 0) {
            speed.y = 0;
        }

    }

    return speed;
}

/**
 * Collision Detection
 */
App.collisionDetection = function(object) {
    if (object.position.x < App.food[App.antsTarget].position.x + BOX_WIDTH &&
       object.position.x + BOX_WIDTH > App.food[App.antsTarget].position.x &&
       object.position.y < App.food[App.antsTarget].position.y + BOX_HEIGHT &&
       BOX_HEIGHT + object.position.y > App.food[App.antsTarget].position.y) {

        // collision detected!
        App.food.splice(App.antsTarget, 1);
        App.antsTarget = null;
    }
}

