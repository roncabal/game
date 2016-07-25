//-----
//System Values
//-----

var STAGE_WIDTH = 600,
STAGE_HEIGHT = 400,
TIME_PER_FRAME = 33,
GAME_FONTS = "bold 20px sans-serif";

var BOX_WIDTH = 32,
BOX_HEIGHT = 32,
ACTUAL_WIDTH = 40,
ACTUAL_HEIGHT = 40;

var RED_SPEED = 2,
ORANGE_SPEED = 2.27,
BLACK_SPEED = 4.54;

//Images
var IMAGE_FOLDER = "images/";
var RED_ANT = IMAGE_FOLDER + "redant.png";
var ORANGE_ANT = IMAGE_FOLDER + "orangeant.png";
var BLACK_ANT = IMAGE_FOLDER + "blackant.png";
var FOOD_IMG  = IMAGE_FOLDER + "food.png";
var BG_IMG = IMAGE_FOLDER + "tablebg.png";

// Probability
var RED_P = 87;
var BLACK_P = RED_P + 6.5;
var ORANGE_P = BLACK_P + 6.5;