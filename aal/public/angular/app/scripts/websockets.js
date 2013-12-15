function moveCursor(x, y) {
	$('#cursor').css('display', 'block').css('left', x).css('top', y);
}

function init() {
	
	var loc = window.location;
	var wsUri = "ws:" + "//" + loc.host + "/websocket";
	
	websocket = new WebSocket(wsUri);
	websocket.onopen = function(evt) {onOpen(evt)};
	websocket.onclose = function(evt) {onClose(evt)};
	websocket.onmessage = function(evt) {onMessage(evt)};
	websocket.onerror = function(evt) {onError(evt)};
}

function onOpen(evt) {
//	alert('Connected');
	sendMessage("Test");
}

function onClose(evt) {
//	alert('Disconnected');
}

function onMessage(evt) {
	parsed = JSON.parse(evt.data);
	console.log(parsed);
	moveCursor(parsed.x, parsed.y);
//	websocket.close();
}

function onError(evt) {
	alert('An error occured')
}

function sendMessage(message) {
	websocket.send(message);
}

window.addEventListener("load", init, false);