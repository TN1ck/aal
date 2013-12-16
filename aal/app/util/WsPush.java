package util;

import play.mvc.WebSocket;
import akka.actor.UntypedActor;

public class WsPush extends UntypedActor {
	
	WebSocket.Out<String> out;
	
	WsPush(WebSocket.Out<String> out) {
		this.out = out;
	}
	
	@Override
	public void onReceive(Object message) {
		if (message.equals("wsPush")) {
			CursorPosition cp = CursorPosition.getRandomPosition();
//			cp.moveCursor();
//			out.write(cp.toJSON());
		} else {
			unhandled(message);
		}
	}
}