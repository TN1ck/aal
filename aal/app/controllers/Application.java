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
import com.fasterxml.jackson.databind.node.ObjectNode;

import akka.actor.ActorRef;
import akka.actor.Cancellable;
import akka.actor.Props;
import play.mvc.*;
import play.mvc.WebSocket.Out;
import play.api.mvc.SimpleResult;
import play.libs.Json;
import play.libs.F.*;
import play.libs.Akka;
import scala.concurrent.Future;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;
import util.MiscUtils;
import util.WsPush;

public class Application extends Controller {
     
    public final static HashMap<Integer, Set<WebSocket.Out<String>>> idsToSockets = new HashMap<Integer, Set<WebSocket.Out<String>>>();
    public final static HashMap<WebSocket.In<String>, WebSocket.Out<String>> inToOut = new HashMap<WebSocket.In<String>, WebSocket.Out<String>>();

    public static Result index() {
        return redirect("index.html");
    }
    
    /**
     * 
     * Creates data for demonstration purposes if the database is empty
     */
    @Transactional
    public static Result createDemoData() {
        
        MiscUtils.emptyDb();
        
        new NewsItem("Zehn, die Minister werden sollten"
                ,"Falls sich Union und SPD auf eine Koalition einigen, werden die Parteien unter sich ausmachen, wer im Kabinett sitzt. Seiteneinsteiger haben kaum Chancen. Muss das sein? SPIEGEL ONLINE zeigt, wer gut in die Ministerriege passen würde, wenn es allein nach Kompetenz ginge."
                ,"tech"
                ,"Spiegel", null).save();
        new NewsItem("Meteorit verrät frühe Entwicklung des Mars"
                ,"In der Sahara haben Beduinen einen Meteoriten vom Mars gefunden. Er stammt aus der Kindheit des Roten Planeten und zeigt, wie dieser sich in jungen Jahren entwickelt hat."
                ,"tech"
                ,"Spiegel", null).save();
        new NewsItem("Russland lässt Kapitän des Greenpeace-Schiffs frei"
            ,"Es wird immer leerer im Gefängnis in St. Petersburg: Erneut hat ein Gericht mehrere Besatzungsmitglieder der 'Arctic Sunrise' freigelassen. Darunter auch den US-amerikanischen Kapitän des Schiffs."
            ,"tech"
            ,"Spiegel", null).save();
        new NewsItem("Zehn, die Minister werden sollten"
            ,"Falls sich Union und SPD auf eine Koalition einigen, werden die Parteien unter sich ausmachen, wer im Kabinett sitzt. Seiteneinsteiger haben kaum Chancen. Muss das sein? SPIEGEL ONLINE zeigt, wer gut in die Ministerriege passen würde, wenn es allein nach Kompetenz ginge."
            ,"tech"
            ,"Spiegel", null).save();
        
        java.util.Date now = Calendar.getInstance().getTime();
        
        new TodoItem("red", "make repository", new Date(now.getTime() + TimeUnit.HOURS.toMillis(0))).save();
        new TodoItem("green", "study for exam", new Date(now.getTime() + TimeUnit.HOURS.toMillis(10))).save();
        new TodoItem("orange", "work for aal", new Date(now.getTime() + TimeUnit.HOURS.toMillis(6))).save();
        new TodoItem("green", "go to hairdresser", new Date(now.getTime() + TimeUnit.HOURS.toMillis(4))).save();
        new TodoItem("orange", "meet Harry", new Date(now.getTime() + TimeUnit.HOURS.toMillis(220))).save();
        new TodoItem("red", "buy flowers", new Date(now.getTime() + TimeUnit.HOURS.toMillis(14))).save();
        new TodoItem("green", "fix broken water pipe in toilet", new Date(now.getTime() + TimeUnit.HOURS.toMillis(340))).save();
        new TodoItem("red", "book flight for holiday", new Date(now.getTime() + TimeUnit.HOURS.toMillis(1337))).save();
        
        new CalendarItem("business", "Meet up with Harry", "TU Berlin", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(0)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(1))).save();
        new CalendarItem("private", "Buy Groceries", "Aldi", "green", new Date(now.getTime() + TimeUnit.HOURS.toMillis(1)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(2))).save();
        new CalendarItem("business", "Meet Aunt Teresa", "At home", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(1)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(5))).save();
        new CalendarItem("private", "Exam :o", "TU Berlin", "orange", new Date(now.getTime() + TimeUnit.HOURS.toMillis(2)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(3))).save();
        new CalendarItem("business", "Buy ticket for concert", null, "green", new Date(now.getTime() + TimeUnit.HOURS.toMillis(0)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(1))).save();
        new CalendarItem("business", "Buy present for Harry", "Kurfürstendamm", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(4)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(6))).save();
        new CalendarItem("business", "Presentation for AAL", "TU Berlin, TEL Building", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(3)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(8))).save();
        
        return ok("Created test data");
    }
    
    /**
     * 
     * Delete all currently held data
     */
    @Transactional
    public static Result deleteAllData() {
        
        MiscUtils.emptyDb();

        return ok("Deleted all data");
    }
    
    @Transactional
    public static Result getAllTodoItems() {
        return ok(Json.toJson(TodoItem.find.all()));
    }
    
    @Transactional
    public static Result getAllCalendarItems() {
        return ok(Json.toJson(CalendarItem.find.all()));
    }
    
    @Transactional
    public static Result getAllNewsItems() {
        return ok(Json.toJson(NewsItem.find.all()));
    }
    
    @Transactional
    public static WebSocket<String> websocket() {
        return new WebSocket<String>() {
            
            // Called when the Websocket Handshake is done.
            public void onReady(final WebSocket.In<String> in, final WebSocket.Out<String> out) {
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
                
//                ActorRef wsPushActor = Akka.system().actorOf(Props.create(WsPush.class, out));
//                final Cancellable cancellable = Akka.system().scheduler().schedule(Duration.Zero(), Duration.create(500, TimeUnit.MILLISECONDS), wsPushActor, "wsPush", Akka.system().dispatcher(), null);
//                
//                Akka.system().scheduler().scheduleOnce(new FiniteDuration(5, TimeUnit.SECONDS), new Runnable() {
//					
//					@Override
//					public void run() {
//						cancellable.cancel();
//					}
//				}, Akka.system().dispatcher());
                
            }
        };
    }
}