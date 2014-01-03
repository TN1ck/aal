package controllers;

import java.sql.Date;
import java.util.Calendar;
import java.util.concurrent.TimeUnit;

import models.CalendarItem;
import models.NewsItem;
import models.TodoItem;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.annotation.Transactional;
import com.fasterxml.jackson.databind.node.ObjectNode;

import akka.actor.ActorRef;
import akka.actor.Cancellable;
import akka.actor.Props;
import play.mvc.*;
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
		
    // just for testing, play won't be used to display stuff
	public static Result index() {
        return redirect("index.html");
    }
	
	/* 
	 * TODO Datenbank mit Daten füllen, wenn diese Methode aufgerufen wird.
	 * Außerdem sollte die Datenbank leer sein. Wird dann über das Interface aufgerufen.
	 * Macht einen alert je nachdem ob's erfolgreich war.
	 */
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
        
        new CalendarItem("Meet up with Harry", "TU Berlin", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(0)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(1))).save();
        new CalendarItem("Buy Groceries", "Aldi", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(1)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(2))).save();
        new CalendarItem("Meet Aunt Teresa", "At home", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(1)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(5))).save();
        new CalendarItem("Exam :o", "TU Berlin", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(2)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(3))).save();
        new CalendarItem("Buy ticket for concert", null, "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(0)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(1))).save();
        new CalendarItem("Buy present for Harry", "Kurfürstendamm", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(4)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(6))).save();
        new CalendarItem("Presentation for AAL", "TU Berlin, TEL Building", "red", new Date(now.getTime() + TimeUnit.HOURS.toMillis(3)), new Date(now.getTime() + TimeUnit.HOURS.toMillis(8))).save();
        
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
	public static Result getTodos() {
		ObjectNode result = Json.newObject();
        return redirect("index.html");
    }
    
    // this will be the main communication port for angularjs
    // just a stub atm
    @Transactional
    public static WebSocket<String> websocket() {
        return new WebSocket<String>() {

            // Called when the Websocket Handshake is done.
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out) {
                // For each event received on the socket,
                // Ich raffe nicht, was mir ne callback bringt, in der ich eh nur ein argument habe
            	// Das hat mit den Argumenten eig nix zu tun. Callback ist halt einfach ein Programmierstil.
            	// Empfiehlt sich besonders für asynchrone Programmierung...
                in.onMessage(new Callback<String>() {
                    public void invoke(String event) {
                        // Log events to the console
                        if (event.equals("Test")){
                            System.out.println("\n\nThe message was 'Test'\n\n");
                        }
                        System.out.println(event);

                    }
                });
                
                in.onClose(new Callback0() {
                    public void invoke() {
                        System.out.println("Disconnected");
                    }
                });
                
                ActorRef wsPushActor = Akka.system().actorOf(Props.create(WsPush.class, out));
                final Cancellable cancellable = Akka.system().scheduler().schedule(Duration.Zero(), Duration.create(500, TimeUnit.MILLISECONDS), wsPushActor, "wsPush", Akka.system().dispatcher(), null);
                
                Akka.system().scheduler().scheduleOnce(new FiniteDuration(5, TimeUnit.SECONDS), new Runnable() {
					
					@Override
					public void run() {
						cancellable.cancel();
					}
				}, Akka.system().dispatcher());
                
            }
        };
    }
}