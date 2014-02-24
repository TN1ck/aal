package controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

import jiac.beans.*;
import ontology.messages.*;
import ontology.messages.NewsFeedData.NewsFeedMessage;
import play.Logger;
import play.libs.F.Callback;
import play.libs.F.Callback0;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.WebSocket;
import util.ASingleton;

import com.avaje.ebean.annotation.Transactional;
import com.fasterxml.jackson.databind.JsonNode;

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
		// Logger.info("Starting Jiac");
		BeanStarter.start();
		return redirect("index.html");
	}

	/*
	 * JI97AC COMMUNICATION VIA HTTP STARTS HERE
	 */

	public static Result getTodo(int uid, int id) {
		Logger.info("GetTodo   uid: " + uid + " id: " + id);
		//String json = "[{\"type\": \"red\", \"text\": \"bla bla\"},{\"type\": \"red\", \"text\": \"bla bla\"},{\"type\": \"orange\", \"text\": \"bla bla\"},{\"type\": \"orange\", \"text\": \"bla bla\"},{\"type\": \"orange\", \"text\": \"bla bla\"},{\"type\": \"red\", \"text\": \"bla bla\"},{\"type\": \"green\", \"text\": \"bla bla\"},{\"type\": \"green\", \"text\": \"bla bla\"}]";
		//ASingleton.sendData(ASingleton.Sockets.TODO, json);
		for (AbstractAgentBean agent : ASingleton.agents) {
			if (agent instanceof TodoBean) {
				// currently the agents are not using the correct stuff
				((TodoBean) agent).getTodos(uid, id);
			}
		}
		return ok("ok");
	}

	public static Result putTodo(int uid) {
		Logger.info("putTodo   uid: " + uid );
		JsonNode json = request().body().asJson();
		if(json == null) {
			return badRequest("Expecting Json data");
		} else {
			String text = json.findPath("text").asText();
			String type = json.findPath("type").asText();
			if(text == null || type == null) {
				return badRequest("Missing parameter [text, type]");
			} else {
				for (AbstractAgentBean agent : ASingleton.agents) {
					if (agent instanceof TodoBean) {
						// currently the agents are not using the correct stuff
						((TodoBean) agent).saveTodo(uid, text, type);
					}
				}
				return ok("ok");
				// return TodoBean.putTodo(text, type);
			}
		}
	}

	public static Result deleteTodo(int uid, int id) {
		return ok("ok");
	}

	public static Result getCalendar(int uid, int id) {
	//	String json = "[{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"},{\"location\": \"Berlin\", \"startDate\": \"2014-02-29 14:00\", \"startDate\": \"2014-02-29 15:00\", \"text\": \"test test test\"}]";
	//	ASingleton.sendData(ASingleton.Sockets.CALENDAR, json);
		
		Logger.info("get calendar uid: " + uid);
		for (AbstractAgentBean agent : ASingleton.agents) {
			if (agent instanceof CalendarBean) {
				((CalendarBean) agent).getCalendarData(uid);
			}
		}
		return ok("ok");
	}

	public static Result putCalendar(int uid) {
		return ok("ok");
	}

	public static Result deleteCalendar(int uid, int id) {
		return ok("ok");
	}

	public static Result getNews() {
		
		
		for (AbstractAgentBean agent : ASingleton.agents) {
			if (agent instanceof NewsBean) {
				((NewsBean) agent).getNewsData();
			}
		}
		
	/*	String lorem = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
		String json = "[{\"header\": \"Lorem ipsum dolor sit.\", \"text\": \""
				+ lorem + "\"},"
				+ "{\"header\": \"Lorem ipsum dolor sit.\", \"text\": \""
				+ lorem + "\"},"
				+ "{\"header\": \"Lorem ipsum dolor sit.\", \"text\": \""
				+ lorem + "\"}, "
				+ "{\"header\": \"Lorem ipsum dolor sit.\", \"text\": \""
				+ lorem + "\"},"
				+ "{\"header\": \"Lorem ipsum dolor sit.\", \"text\": \""
				+ lorem + "\"}" + "]";
		ASingleton.sendData(ASingleton.Sockets.NEWS, json);
		*/
		return ok("ok");
	}

	public static Result getMail(int uid, int id) {
		Logger.info("get mail uid: " + uid);
		for (AbstractAgentBean agent : ASingleton.agents) {
			if (agent instanceof MailBean) {
				((MailBean) agent).getMailData(uid);
			}
		}
		return ok("ok");
	}

	public static Result putMail(int uid) {
		JsonNode json = request().body().asJson();
		if (json == null) {
			return badRequest("Expecting Json data");
		} else {
			for (AbstractAgentBean agent : ASingleton.agents) {
				if (agent instanceof MailBean) {
					((MailBean) agent).writeMail(uid,json);
				}
			}
			return ok("ok");
		}
	}

	public static Result getUser(int uid, String token) {
		if(token != null && token != "") {
			for (AbstractAgentBean agent : ASingleton.agents) {
				if (agent instanceof FacebookBean) {
					((FacebookBean) agent).getFacebookData(uid,token);
				}
			}
			return ok("ok");
		}
		return badRequest("Token is not given");
	}

	public static Result deleteMail(int uid, int id) {
		return ok("ok");
	}


	public static Result startTraining(int nid) {

		for (AbstractAgentBean agent : ASingleton.agents) {
			if (agent instanceof GestureBean) {
				((GestureBean) agent).startTraining(nid);
			}
		}

		return ok("ok");
	}

	public static Result recognize(int nid) {
		for (AbstractAgentBean agent : ASingleton.agents) {
			if (agent instanceof GestureBean) {
				((GestureBean) agent).recognize(nid, false);
			}
		}
		return ok("ok");
	}

	public static Result putGoogleAcc(int userID, String name, String password) {
		Logger.info("put google id: " + userID + "  name: " + name + "  pass: " + password);
		for (AbstractAgentBean agent : ASingleton.agents) {
			if (agent instanceof MailBean) {
				((MailBean) agent).putGoogleAcc(userID, name, password);
			}
		}
		
		return ok("ok");
	}
	
	@Transactional
	public static WebSocket<String> websocket() {
		return new WebSocket<String>() {

			// Called when the Websocket Handshake is done.
			public void onReady(final WebSocket.In<String> in,
					final WebSocket.Out<String> out) {

				outSockets.add(out); // add to outSockets, this could be changed
										// in the future, used for jiac-stuff
				inToOut.put(in, out);

				in.onMessage(new Callback<String>() {
					public void invoke(String event) {
						int index = event.indexOf(":");
						String prefix = event.substring(0, index);
						String message = event.substring(index + 1);

						Set<Out<String>> currentSet = idsToSockets.get(prefix);
						if (currentSet == null) {
							currentSet = new HashSet<Out<String>>();
						}
						currentSet.add(out);
						idsToSockets.put(prefix, currentSet);

						System.out.println("Length of idToSockets: "
								+ idsToSockets.size());
						System.out.println("Length of inToOut: "
								+ inToOut.size());

						if (!message.equals("")) {
							for (WebSocket.Out<String> outOfSameId : currentSet) {
								outOfSameId.write("" + prefix + ":" + message);
							}
						}
					}
				});

				in.onClose(new Callback0() {
					public void invoke() {
						WebSocket.Out<String> relatedOut = inToOut.remove(in);
						Set<String> keys = idsToSockets.keySet();

						for (String key : keys) {
							Set<WebSocket.Out<String>> associatedSockets = idsToSockets
									.get(key);
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