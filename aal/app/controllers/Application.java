package controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

import jiac.beans.BeanStarter;
import jiac.beans.TodoBean;
import play.Logger;
import play.libs.F.Callback;
import play.libs.F.Callback0;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.WebSocket;
import util.ASingleton;

import com.avaje.ebean.annotation.Transactional;

import de.dailab.jiactng.agentcore.AbstractAgentBean;
//import org.eclipse.jetty.util.log.Log;
//import models.CalendarItem;
//import models.NewsItem;
//import models.TodoItem;

public class Application extends Controller {
     
    public final static HashMap<String, Set<WebSocket.Out<String>>> idsToSockets = ASingleton.idsToSockets;
    public final static HashMap<WebSocket.In<String>, WebSocket.Out<String>> inToOut = ASingleton.inToOut;
    public final static LinkedList<WebSocket.Out<String>> outSockets = ASingleton.outSockets;

    public static Result index() {
        //Logger.info("Starting Jiac");
        BeanStarter.start();
        return redirect("index.html");
    }
    
    
    /*
     * JIAC COMMUNICATION VIA HTTP STARTS HERE
     * 
     */
    
    public static Result getTodo(int uid, int id) {
      String json = "[{\"type\": \"red\", \"text\": \"bla bla\"},{\"type\": \"red\", \"text\": \"bla bla\"},{\"type\": \"orange\", \"text\": \"bla bla\"},{\"type\": \"orange\", \"text\": \"bla bla\"},{\"type\": \"orange\", \"text\": \"bla bla\"},{\"type\": \"red\", \"text\": \"bla bla\"},{\"type\": \"green\", \"text\": \"bla bla\"},{\"type\": \"green\", \"text\": \"bla bla\"}]";
      ASingleton.sendData(ASingleton.Sockets.TODO, json);
        for (AbstractAgentBean agent : ASingleton.agents) {
            if (agent instanceof TodoBean) {
            	// currently the agents are not using the correct stuff
                // ((TodoBean) agent).getTodos(uid);
            }
        }
        return ok("ok");
    }
    
    public static Result putTodo(int uid) {
        return ok("ok");
    }
    
    public static Result deleteTodo(int uid, int id) {
        return ok("ok");
    }
    
    public static Result getCalendar(int uid, int id) {
      String json = "[{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"}]";
      ASingleton.sendData(ASingleton.Sockets.CALENDAR, json);
        return ok("ok");
    }
    
    public static Result putCalendar(int uid) {
        return ok("ok");
    }
    
    public static Result deleteCalendar(int uid, int id) {
        return ok("ok");
    }
    
    public static Result getNews(int uid, int id) {
      String json = "[{\"header\": \"woop woop\", \"text\": \"Some Nachrichten, wat wat\"}]";
      ASingleton.sendData(ASingleton.Sockets.NEWS, json);
        return ok("ok");
    }

    public static Result getMail(int uid, int id) {
        String json = "[{\"subject\": \"Spam\", \"text\": \"Hello faggot, I want to send me your credit card number instantly. If I am not receiving it until tomorrow your family is going to die. Regards, The Joker\", \"received\": \"2014-02-13 14:13\"},{\"subject\": \"Job Offer\", \"text\": \"Hello Mr. Wanker, I write you this email to tell you, your qualifications are completely useless. You couldn't even work for the DAI.\", \"received\": \"2014-02-15 16:11\"}]";
        ASingleton.sendData(ASingleton.Sockets.MAIL, json);
        return ok("ok");
    }
    
    public static Result putMail(int uid) {
        return ok("ok");
    }
    
    public static Result deleteMail(int uid, int id) {
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
                        String prefix = event.substring(0, index);
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
                        Set<String> keys = idsToSockets.keySet();
                        
                        for (String key : keys) {
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