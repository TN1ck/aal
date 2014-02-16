package controllers;

import java.sql.Date;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import models.CalendarItem;
import models.NewsItem;
import models.TodoItem;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.Transactional;
import com.avaje.ebean.text.json.JsonContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.ontology.IActionDescription;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.action.DoAction;
import de.dailab.jiactng.agentcore.AbstractAgentBean;
import akka.actor.ActorRef;
import akka.actor.Cancellable;
import akka.actor.Props;
import play.mvc.*;
import play.mvc.WebSocket.Out;
import play.api.mvc.SimpleResult;
import play.libs.Json;
import play.libs.F.*;
import play.libs.Akka;
import play.Logger;  
import scala.concurrent.Future;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;
import util.ASingleton;
import util.MiscUtils;
import util.WsPush;
import jiac.beans.BeanStarter;
import jiac.beans.TodoBean;

public class Application extends Controller {
     
    public final static HashMap<Integer, Set<WebSocket.Out<String>>> idsToSockets = ASingleton.idsToSockets;
    public final static HashMap<WebSocket.In<String>, WebSocket.Out<String>> inToOut = ASingleton.inToOut;
    public final static LinkedList<WebSocket.Out<String>> outSockets = ASingleton.outSockets;

    public static Result index() {
        BeanStarter.start();
        return redirect("index.html");
    }
    

    public static Result getMails() {
        return ok("started jiac");
    }
    
    /**
     * 
     * Creates data for demonstration purposes if the database is empty
     */
    @Transactional
    public static Result createDemoData() {
        return ok("ok");
    }
    
    /**
     * 
     * Delete all currently held data
     */
    @Transactional
    public static Result deleteAllData() {
        MiscUtils.emptyDb();

        return ok("ok");
    }

    public static Result getAllTodoItems() {
	   return ok("ok");
	}
    
    public static Result getAllTodoItems() {
    	String json = "test test test";
		ASingleton.sendData(ASingleton.Sockets.TODO, json);
        return ok("ok");
  	}
    
    @Transactional
    public static Result getAllCalendarItems() {
        return ok("ok");
    }
    
    @Transactional
    public static Result getAllNewsItems() {
        return ok("ok");
    }

    @Transactional
    public static Result getAllMailItems() {
        return ok("ok");
    }
    
    @Transactional
    public static WebSocket<String> websocket() {
        return new WebSocket<String>() {
            
            // Called when the Websocket Handshake is done.
            public void onReady(final WebSocket.In<String> in, final WebSocket.Out<String> out) {
 	
            	outSockets.add(out); // add to outSockets, this could be changed in the future, used for jiac-stuff
            	inToOut.put(in, out);

                in.onMessage(new Callback<String>() {
                    public void invoke(String event) {
                    	int index = event.indexOf(":");
                    	int prefix = Integer.parseInt(event.substring(0, index));
                    	String message = event.substring(index+1);

                        Set<Out<String>> currentSet = idsToSockets.get(prefix);
                        if (currentSet == null) {
                        	currentSet = new HashSet<Out<String>>();
                        }
                        currentSet.add(out);
                        idsToSockets.put(prefix, currentSet);
                        
                        System.out.println("Length of idToSockets: "+idsToSockets.size());
                        System.out.println("Length of inToOut: "+inToOut.size());

                        if (!message.equals("")) {
	                        for (WebSocket.Out<String> outOfSameId : currentSet) {
	                        	outOfSameId.write(""+prefix+":"+message);
	                        }
                        }
                    }
                });
                
                in.onClose(new Callback0() {
                    public void invoke() {
                    	WebSocket.Out<String> relatedOut = inToOut.remove(in);
                    	Set<Integer> keys = idsToSockets.keySet();
                        
                    	for (Integer key : keys) {
                    		Set<WebSocket.Out<String>> associatedSockets = idsToSockets.get(key);
                    		associatedSockets.remove(relatedOut);
                    		idsToSockets.put(key, associatedSockets);
                    	}
                    	
                    	System.out.println("Disconnected");
                    }
                });
                
            }
        };
    }

    @Transactional
    public static Result startJiac() {
        Logger.info("Start JIAC");
        BeanStarter.start();
        return ok("started jiac");
    }

    @Transactional
    public static Result stopJiac() {
        Logger.info("Stop JIAC");
        BeanStarter.stop();
        return ok("stopped jiac");
    }
}