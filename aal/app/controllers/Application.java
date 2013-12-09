package controllers;

import play.*;
import play.mvc.*;
import play.libs.F.*;

import views.html.*;

public class Application extends Controller {
		
    // just for testing, play won't be used to display stuff
    public static Result index() {
        return redirect("index.html");
    }

    // this will be the main communication port for angularjs
    // just a stub atm
    public static WebSocket<String> websocket() {
        return new WebSocket<String>() {
            boolean toggle = false;

            // Called when the Websocket Handshake is done.
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out) {
                // For each event received on the socket,
                // Ich raffe nicht, was mir ne callback bringt, in der ich eh nur ein argument habe
                in.onMessage(new Callback<String>() {
                    public void invoke(String event) {

                        // Log events to the console
                        if (event.equals("Test")){
                            writeAnswer1();
                            toggle = true;
                            System.out.println("YEEEEEHA!");
                            System.out.println(toggle);
                        } else {
                            writeAnswer2();
                        }
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
                // System.out.println("I am here");
                // System.out.println(toggle);
                // if(toggle == true){
                //     out.write("Not Hello!");
                // } else {

                // }
            }

            // public void writeAnswer1(){
            //     out.write("FUCK!!!!!!!");
            // }

            // public void writeAnswer2(){
            //     Out.write("Haha2");
            // }

        };
    }



}