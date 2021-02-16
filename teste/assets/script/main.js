var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var veloc = new Image();
var sx_veloc = [18,224,430,18,224,430,18,224,430,147];
var sy_veloc = [505,505,505,368,368,368,232,232,232,24];
var width_veloc = [178,178,178,178,178,178,178,178,178,330];
var height_veloc = [96,96,96,96,96,96,96,96,96,180];
var level = 0;
veloc.src = './assets/img/veloc.png';

var desenha = setInterval(function(){
	if(level == 10 ){
	  level=0;
	}
	ctx.clearRect(0,0,1500,1500);
	ctx.drawImage(veloc,sx_veloc[level],sy_veloc[level],width_veloc[level],height_veloc[level],60,30,177,95);
	level++;
  },1000);