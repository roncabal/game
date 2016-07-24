//-----
//System Vars
//-----

var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;

var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;

//-----
//Browser Detection
//-----

navigator.sayswho = (function()
	{
		var N = navigator.appName, ua= navigator.userAgent, tem;
		var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!=null) M[2]=tem[1];
		M = M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

		return M;
	}
)();

var browser;
if(navigator.sayswho[0] == "Firefox")
	browser = "f";
else if(navigator.sayswho[0] == "Chrome")
	browser = "c";
else if(navigator.sayswho[0] == "Safari")
	browser = "s";
else if(navigator.sayswho[0] == "Microsoft")
	browser = "m";
else
	browser = "f";

//Ants
var redReady = false;
var redImage = new Image();
redImage.onload = function () {
	redReady = true;
};
redImage.src = "groudon.png";

var orangeReady = false;
var orangeImage = new Image();
orangeImage.onload = function () {
	orangeReady = true;
};
orangeImage.src = "other.png";

var blackReady = false;
var blackImage = new Image();
blackImage.onload = function () {
	blackReady = true;
};
blackImage.src = "red.png";

//Game Objects

var gameloop, mouseX, mouseY, isClicked, score;
var red, orange, black, time, speed;

//Init Values

isClicked = false;
score = 0;

//Setup Ants Array
redArray = new Array();
orangeArray = new Array();
blackArray = new Array();

gameloop = setInterval(update, TIME_PER_FRAME);
gameloop = setInterval(rate, interval);

stage.addEventListener("click", canvasClick, false);

function canvasClick(event)
{
	if(browser == "f" || browser == "m")
	{
		mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
		mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}
	isClicked = true;
}

//-----
//Game Loop
//-----

function update()
{
	//Clear Canvas
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, stage.width , stage.height);
	

	
	for(var i=redArray.length - 1; i>= 0; i--)
	{
		redArray[i].y++;
		if (redArray[i].y > stage.height)
			redArray.splice(i, 1);
		else
		{
			drawRed(redArray[i].x, redArray[i].y);

			if(isClicked)
			{
				if(hitTestPoint(redArray[i].x, redArray[i].y, BOX_WIDTH, BOX_HEIGHT, mouseX, mouseY))
				{
					score++;
					redArray.splice(i, 1);
				}
			}
		}
	}
	
	for(var i=orangeArray.length - 1; i>= 0; i--)
	{
		orangeArray[i].y++;
		if (orangeArray[i].y > stage.height)
			orangeArray.splice(i, 1);
		else
		{
			drawOrange(orangeArray[i].x, orangeArray[i].y);

			if(isClicked)
			{
				if(hitTestPoint(orangeArray[i].x, orangeArray[i].y, BOX_WIDTH, BOX_HEIGHT, mouseX, mouseY))
				{
					score = score + 3;
					orangeArray.splice(i, 1);
				}
			}
		}
	}
	
	for(var i=blackArray.length - 1; i>= 0; i--)
	{
		blackArray[i].y++;
		if (blackArray[i].y > stage.height)
			blackArray.splice(i, 1);
		else
		{
			drawBlack(blackArray[i].x, blackArray[i].y);

			if(isClicked)
			{
				if(hitTestPoint(blackArray[i].x, blackArray[i].y, BOX_WIDTH, BOX_HEIGHT, mouseX, mouseY))
				{
					score = score + 5;
					blackArray.splice(i, 1);
				}
			}
		}
	}

	isClicked = false;

	//Update Score
	ctx.fillStyle = "white";
	ctx.fillText(score, 30, 30);
}

//New edit. Delete and change gameloop = setInterval(rate, spawn number)
var interval = function(hold, space)
{
	hold = Math.random() * 2;
	if(hold = 0)
	{
		space = SPAWN_TIME;
	}
	else if(hold = 1)
	{
		space = SPAWN_TIME_TWO;
	}
	else if(hold = 2)
	{
		space = SPAWN_TIME_THREE;
	}
	
	return space;
}

//Spawn Rate
function rate(spawn)
{
	spawn = ((Math.random() * 46) + 1);
	
	if(spawn <= 40)
	{
		//Red Ant
		red = new Object();
		red.x = Math.floor(Math.random() * stage.width);
		red.y = -10;
		redArray.push(red);
	}
	else if(spawn <= 43)
	{
		//Orange Ant
		orange = new Object();
		orange.x = Math.floor(Math.random() * stage.width);
		orange.y = -10;
		orangeArray.push(orange);
	}
	else if(spawn >= 44)
	{
		//Black Ant
		black = new Object();
		black.x = Math.floor(Math.random() * stage.width);
		black.y = -10;
		blackArray.push(black);
	}
}

function drawRed(xPos, yPos)
{
	ctx.drawImage(redImage, xPos, yPos);
}

function drawOrange(xPos, yPos)
{
	ctx.drawImage(orangeImage, xPos, yPos);
}

function drawBlack(xPos, yPos)
{
	ctx.drawImage(blackImage, xPos, yPos);
}

function hitTestPoint(x1, y1, w1, h1, x2, y2)
{
	//x1, y1 = x and y coordinates of object 1
	//w1, h1 = width and height of object 1
	//x2, y2 = x and y coordinates of object 2 (usually midpt)
	if((x1 <= x2 && x1+w1 >= x2) && (y1 <= y2 && y1+h1 >= y2))
		return true;
	else
		return false;
}