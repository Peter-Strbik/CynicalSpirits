var c = document.getElementById("slate");
var ctx = c.getContext("2d");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var addButton = document.getElementById("add");
// NEED HTML

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

ctx.fillStyle = "#00ff00";

var balls = []
var ID;

var makeBall = function(){
    var xDir = 1 * Math.random();
    var yDir = 1 * Math.random();
    var speed = 10 * Math.random();
    var color = getRandomColor();
    var radius = 10 + 30 * Math.random();
    var xPos = Math.floor((Math.random() * (c.width - 2 * radius)) + radius);
    var yPos = Math.floor((Math.random() * (c.height - 2 * radius)) + radius);
    var wallBounce = function(){
    	xPos += speed * xDir;
    	yPos += speed * yDir;
    	if (Math.abs(xPos-c.width/2) >= c.width/2 - radius){
	    xDir = xDir * -1;
	}
	if (Math.abs(yPos-c.height/2) >= c.height/2 - radius){
	    yDir = yDir * -1;
        }
    };
    var checkSelf(ball2){
	return xPos == ball2.x && yPos == ball2.y && radius == ball2.r;
    };
    var ballBounce = function(x,y,xv,yv,c,bool){
    	for (i = 0; i < balls.length; i++) {
		if (!checkSelf(balls[i])){
			if (distanceBetween(this,balls[i])){
				xDir = xDir * -1;
				yDir = yDir * -1;
				balls[i].x = balls[i].x * -1;
				balls[i].y = balls[i].y * -1;
			};	
		};
	};
    };
    var drawBall = function(){
    	ctx.fillStyle = color;
    	ctx.beginPath();
	ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
    };
 
    
    return {
    	bounce : wallBounce,
    	draw : drawBall,
    	x : xPos,
    	y : yPos,
    	xV : xDir,
    	yV : yDir,
    	r : radius
    };
};



var distBetween(ball1, ball2){
	return Math.pow((ball1.x - ball2.x),2) + Math.pow((ball1.y - ball2.y),2) <= Math.pow((ball1.r + ball2.r),2);
};

var addBall = function(){ balls.push(makeBall());}

var drawBall = function(){
    window.cancelAnimationFrame(ID);
    var animate = function(){
	ctx.clearRect(0,0,500,500);
	for (i = 0; i < balls.length; i++) {
		balls[i].bounce();
    		balls[i].draw();
	}
	ID = requestAnimationFrame(animate);
    };

    animate()

};

var stopBall = function(){
    cancelAnimationFrame(ID);
};


startButton.addEventListener("click", drawBall);
stopButton.addEventListener("click", stopBall);
addButton.addEventListener("click", addBall);

	
