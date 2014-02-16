package util;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

import play.mvc.*;
import play.mvc.WebSocket.Out;
import de.dailab.jiactng.agentcore.AbstractAgentBean;

public final class ASingleton {
    public static final LinkedList<AbstractAgentBean> agents = new LinkedList<AbstractAgentBean>();
    public final static HashMap<Integer, Set<WebSocket.Out<String>>> idsToSockets = new HashMap<Integer, Set<WebSocket.Out<String>>>();
    public final static HashMap<WebSocket.In<String>, WebSocket.Out<String>> inToOut = new HashMap<WebSocket.In<String>, WebSocket.Out<String>>();
    public final static LinkedList<WebSocket.Out<String>> outSockets = new LinkedList<WebSocket.Out<String>>();
    
    public enum Sockets {
    	TODO,
    	SOCIAL,
    	NEWS,
    	MAIL,
    	CALENDAR
    }
    
    public static void sendData(Sockets id, String json) {
    	// high security
        if (!json.equals("")) {
            for (WebSocket.Out<String> socket : outSockets) {
                socket.write(""+id+":"+json);
            }
        }
        
    }

}
