var c = document.getElementById("slate");
var ctx = c.getContext("2d");
var dvdButton = document.getElementById("dvd");
var stopButton = document.getElementById("stop");

ctx.fillStyle = "#00ff00";

var ID;

var drawDVD = function(){
    window.cancelAnimationFrame(ID);
    var xDir = 1;
    var yDir = 1;
    var xPos = Math.floor((Math.random() * (c.width - 20)) + 10);
    var yPos = Math.floor((Math.random() * (c.height - 20)) + 10);
    var animate = function(){
	ctx.clearRect(0,0,500,500);
	xPos += xDir;
	yPos += yDir;
	if (xPos >= (c.width - 10)){
	    xDir = -1;
	}
	if (yPos >= (c.height - 10)){
	    yDir = -1;
	}
	if (xPos <= 10){
	    xDir = 1;
	}
	if (yPos <= 10){
	    yDir = 1;
	}

	ctx.beginPath();
	ctx.arc(xPos, yPos, 10, 0, 2 * Math.PI);
	ctx.fill();

	ID = requestAnimationFrame(animate);
    };

    animate()

};

var stopDVD = function(){
    cancelAnimationFrame(ID);
};

dvdButton.addEventListener("click", drawDVD);
stopButton.addEventListener("click", stop);

	
