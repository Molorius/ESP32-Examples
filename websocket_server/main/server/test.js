document.getElementById("test").innerHTML = "WebSocket is not connected";

var websocket = new WebSocket('ws://'+location.hostname+'/');
var slider = document.getElementById("myRange");

slider.oninput = function () {
  websocket.send("L" + slider.value);
}

function sendMsg() {
  websocket.send('L50');
  console.log('Sent message to websocket');
}

function sendText(text) {
  websocket.send("M" + text);
}

websocket.onopen = function(evt) {
  console.log('WebSocket connection opened');
  websocket.send("It's open! Hooray!!!");
  document.getElementById("test").innerHTML = "WebSocket is connected!";
}

websocket.onmessage = function(evt) {
  var msg = evt.data;
  var value;
  switch(msg.charAt(0)) {
    case 'L':
      console.log(msg);
      value = parseInt(msg.replace(/[^0-9\.]/g, ''), 10);
      slider.value = value;
      console.log("Led = " + value);
      break;
    default:
      document.getElementById("output").innerHTML = evt.data;
      break;
  }
}

websocket.onclose = function(evt) {
  console.log('Websocket connection closed');
  document.getElementById("test").innerHTML = "WebSocket closed";
}

websocket.onerror = function(evt) {
  console.log('Websocket error: ' + evt);
  document.getElementById("test").innerHTML = "WebSocket error????!!!1!!";
}
