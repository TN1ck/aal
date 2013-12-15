package controllers;

import java.util.concurrent.TimeUnit;

import akka.actor.ActorRef;
import akka.actor.Cancellable;
import akka.actor.Props;
import play.mvc.*;
import play.libs.F.*;
import play.libs.Akka;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;
import util.WsPush;

public class Application extends Controller {
		
    // just for testing, play won't be used to display stuff
    public static Result index() {
        return redirect("index.html");
    }
    
    // this will be the main communication port for angularjs
    // just a stub atm
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
                            System.out.println("The message was 'Test'");
                        } else {
                            //writeAnswer2();
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
                
                Akka.system().scheduler().scheduleOnce(new FiniteDuration(180, TimeUnit.SECONDS), new Runnable() {
					
					@Override
					public void run() {
						cancellable.cancel();
					}
				}, Akka.system().dispatcher());
                
            }
        };
    }
}