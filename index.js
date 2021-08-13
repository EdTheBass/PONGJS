let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
var bounceSound = document.getElementById('bounce');
var scoreSound = document.getElementById('score');

var screen = {
	x: 20,
	y: 20,
	w: 760,
	h: 560
};

var centre = {
	x: 400,
	y: 20,
	w: 3,
	h: 560
};

var bat = {
	w: 20,
	h: 80,
	s: 10
};

var bat1 = {
	x: 40,
	y: 260
};

var bat2 = {
	x: 740,
	y: 260
};

var scores = {
	one: 0,
	two: 0
};

ballMovements = [-6, 6]

var ball = {
	x: 400,
	xc: ballMovements[Math.round(Math.random())],
	y: 300,
	yc: ballMovements[Math.round(Math.random())],
	w: 20,
	h: 20
};

var moveUp1 = false;
var moveDown1 = false;
var moveUp2 = false;
var moveDown2 = false;

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(key) {
	if (key.key == "w") {
		moveUp1 = true;
	} else if (key.key == "s") {
		moveDown1 = true;
	}
}

function keyUp(key) {
	if (key.key == "w") {
		moveUp1 = false;
	} else if (key.key == "s") {
		moveDown1 = false;
	}
}

function bat2AI() {
	if (ball.x > 400 && ball.xc > 0) {
		if (ball.y < (bat2.y + 40)) {
			bat2.y -= 5;
		} else if (ball.y > (bat2.y + 40)) {
			bat2.y += 5;
		}
	}
}

function checkBatMovement() {
	if (moveUp1) {
		moveBat(1, -bat.s);
	} else if (moveDown1) {
		moveBat(1, bat.s);
	}
}

function checkBatOffScreen() {
	if (bat1.y < 20) {
		bat1.y = 20;
	} else if (bat1.y > 500) {
		bat1.y = 500;
	}
	if (bat2.y < 20) {
		bat2.y = 20;
	} else if (bat2.y > 500) {
		bat2.y = 500;
	}
}

function checkBallOffScreen() {
	if (ball.y < 19) {
		ball.yc = -ball.yc;
	} else if (ball.y > 561) {
		ball.yc = -ball.yc;
	}
}

function checkBallToBatCollision() {
	if (Math.round(ball.x) <= 62 || Math.round(ball.x) == 718) {
		if (ball.y >= bat1.y && ball.y <= (bat1.y + 80)) {
			bounceSound.play();
 			ball.xc = -ball.xc;
		} else if (ball.y >= bat2.y && ball.y <= (bat2.y + 80)) {
			bounceSound.play();
			ball.xc = -ball.xc;
		}
	}
}

function checkScore() {
	if (ball.x <= 21) {
		scoreSound.play();
		ball.x = 400;
		ball.y = 300;
		ball.xc = 3;
		scores.two++;
	} else if (ball.x >= 779) {
		scoreSound.play();
		ball.x = 400;
		ball.y = 300;
		ball.xc = -3;
		scores.one++;
	}
}	

function drawScreen() {
	ctx.fillStyle = "#000";
	ctx.fillRect(screen.x, screen.y, screen.w, screen.h);
}

function drawScore() {
	ctx.font = "60px game";
	ctx.fillStyle = "#fff";
	ctx.textAlign = "center";
	ctx.fillText(scores.one.toString(), 200, 150);
	ctx.fillText(scores.two.toString(), 600, 150);
}

function drawCentre() {
	ctx.fillStyle = "#fff";
	ctx.fillRect(centre.x, centre.y, centre.w, centre.h);
}

function drawBat() {
	ctx.fillStyle = "#fff";
	ctx.fillRect(bat1.x, bat1.y, bat.w, bat.h);
	ctx.fillRect(bat2.x, bat2.y, bat.w, bat.h);
}

function drawBall() {
	ctx.fillStyle = "#fff";
	ctx.fillRect(ball.x, ball.y, ball.w, ball.h);
}

function moveBat(bat, v) {
	if (bat == 1) {
		bat1.y += v;  
	} else if (bat == 2) {
		bat2.y += v;
	}
}

function moveBall() {
	ball.x += ball.xc;
	ball.y += ball.yc;
}

function gameLoop(timestamp) {
	moveBall();
	bat2AI();
	checkBatMovement();
	checkBatOffScreen();
	checkBallOffScreen();
	checkBallToBatCollision();
	checkScore();
	drawScreen();
	drawScore();
	drawCentre();
	drawBat();
	drawBall();
	
	requestAnimationFrame(gameLoop);
}

gameLoop();