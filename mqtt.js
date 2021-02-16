
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var veloc = new Image();
var sx_veloc = [18,224,430,18,224,430,18,224,430,147];
var sy_veloc = [505,505,505,368,368,368,232,232,232,24];
var width_veloc = [178,178,178,178,178,178,178,178,178,330];
var height_veloc = [96,96,96,96,96,96,96,96,96,180];
var level = 0;
veloc.src = './assets/img/veloc.png';


  
// Create a client instance: Broker, Port, Websocket Path, Client ID
client = new Paho.MQTT.Client("192.168.8.47", Number(9001), "clientId");

// set callback handlers
client.onConnectionLost = function (responseObject) {
    console.log("Connection Lost: "+responseObject.errorMessage);
    document.getElementById("header-h1").innerHTML = "Dashboard Status: Desconnected!!";
}

client.onMessageArrived = function (message) {
  console.log("Message Arrived: "+message.payloadString);
}

// Called when the connection is made
function onConnect(){
  console.log("Connected!");
  document.getElementById("header-h1").innerHTML = "Dashboard Status: Connected!!";
  
  document.addEventListener('keydown',function(e){
    message = new Paho.MQTT.Message("1");
    if(e.keyCode){
      
      switch(e.keyCode){
        case 38:
          message.destinationName = "direction/forward";
          client.send(message);
          if(level < 10){
              level += 1;
          }
        break;
        case 39:
          message.destinationName = "direction/right";
          client.send(message); 
        break;
        case 40:
          message.destinationName = "direction/back";
         client.send(message);   
        break;
        case 37:
          message.destinationName = "direction/left";
          client.send(message); 
        break;
      }
    }
  });
  document.addEventListener('keyup',function(e){
    message = new Paho.MQTT.Message("0");
   
    if(e.keyCode){

      switch(e.keyCode){
        case 38:
          message.destinationName = "direction/forward";
          client.send(message); 
        break;
        case 39:
          message.destinationName = "direction/right";
          client.send(message); 
        break;
        case 40:
          message.destinationName = "direction/back";
         client.send(message);   
        break;
        case 37:
          message.destinationName = "direction/left";
          client.send(message); 
        break;
      }
    }
  }); 
}

// Connect the client, providing an onConnect callback
client.connect({
  onSuccess: onConnect
  
});

var desenha = setInterval(function(){
  if(level > 0 ){
    level -= 1;
  }
  ctx.clearRect(30,30,500,500);
  ctx.drawImage(veloc,sx_veloc[level],sy_veloc[level],width_veloc[level],height_veloc[level],60,30,178,96);
 
},50);
