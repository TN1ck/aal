package controllers;

import play.*;
import play.mvc.*;
import play.libs.F.*;

import views.html.*;

public class Application extends Controller {

    // just for testing, play won't be used to display stuff
    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    // this will be the main communication port for angularjs
    // just a stub atm
    public static WebSocket<String> websocket() {
        return new WebSocket<String>() {

            // Called when the Websocket Handshake is done.
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out) {

                // For each event received on the socket,
                in.onMessage(new Callback<String>() {
                    public void invoke(String event) {

                        // Log events to the console
                        System.out.println(event);

                    }
                });

                // When the socket is closed.
                in.onClose(new Callback0() {
                    public void invoke() {

                        System.out.println("Disconnected");

                    }
                });

                // Send a single 'Hello!' message
                out.write("Hello!");

            }

        };
    }

}