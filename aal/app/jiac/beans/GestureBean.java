package jiac.beans;

import static de.dailab.jiactng.agentcore.comm.CommunicationAddressFactory.createGroupAddress;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.io.Serializable;

import com.google.gson.Gson;

import models.User;
import ontology.Message;
import ontology.MessageType;
import ontology.messages.Gesture;
import ontology.messages.NewUser;
import ontology.messages.RecognizeUser;
import ontology.messages.TrainUser;
import ontology.messages.UserLeft;
import ontology.messages.UserState;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IGroupAddress;
import util.ASingleton;

public class GestureBean extends AbstractCommunicatingBean {

	private Action sendAction = null;
	private IGroupAddress gestureAddress = null;
	Robot r = null;
	
	Gson gson = new Gson();

	@Override
	public void doInit() {
		this.gestureAddress = createGroupAddress("GestureGroup");
	}

	@Override
	public void doStart() throws Exception {
		super.doStart();
		log.info("starting....");
		log.info("my ID: " + this.thisAgent.getAgentId());
		log.info("my Name: " + this.thisAgent.getAgentName());
		log.info("my Node: " + this.thisAgent.getAgentNode().getName());

		invoke(join, new Serializable[] { this.gestureAddress }, this);
		
		ASingleton.agents.add(this);

		sendAction = retrieveAction(ICommunicationBean.ACTION_SEND);
		if (sendAction == null) 
			throw new RuntimeException("Send action not found.");

		try {
			r = new Robot();
		} catch (AWTException e) {
			log.info("GestureAgent - ERROR: Can not create Robot for Key Input");
			e.printStackTrace();
		}

	}

//	public void execute() {
//		Double niteID = new Double(Math.random() * 100);
//		User user = new User(niteID.intValue());
//		ASingleton.sendData(ASingleton.Sockets.ADD_USER, gson.toJson(user));
//	} 
	
	public void startTraining(int niteID) {
		sendMessage(new TrainUser(thisAgent.getAgentId(), null, niteID), this.gestureAddress);
	}
	
	public void recognize(int niteID, boolean qr) {
		sendMessage(new RecognizeUser(thisAgent.getAgentId(), null, niteID, qr), this.gestureAddress);
	}

	@Override
	protected void receiveMessage(Message message) {
		
		if(message instanceof Gesture){
			String gesture = ((Gesture) message).getGesture();
			int niteID = ((Gesture) message).getNiteID();
			User user = ASingleton.niteToUser.get(niteID);
			if (user == null) {
				user = ASingleton.niteToUser.put(niteID, new User(niteID));
			}
			log.info("GestureAgent - received Gesture: " + gesture);
			ASingleton.sendData(ASingleton.Sockets.DEBUG_KEYS, gesture);
			switch(gesture) {
			case "screen_toggle":
				if (user.allowed) {
					pressKey(KeyEvent.VK_2);					
				}
				break;
			case "tab_up!hand_right": 
				if (user.allowed) {					
					pressKey(KeyEvent.VK_UP);
				}
				break;
			case "tab_right!hand_right":
				if (user.allowed) {
					pressKey(KeyEvent.VK_RIGHT);					
				}
				break;
			case "tab_left!hand_right":
				if (user.allowed) {
					pressKey(KeyEvent.VK_LEFT);					
				}
				break;
			case "tab_down!hand_right":
				if (user.allowed) {
					pressKey(KeyEvent.VK_DOWN);					
				}
				break;
			case "push|hand_right":
				if (user.allowed) {
					pressKey(KeyEvent.VK_ENTER);					
				}
				break;
			case "tab_down!hand_left":
				pressKey(KeyEvent.VK_7);
				break;
			case "tab_up!hand_left":
				pressKey(KeyEvent.VK_8);
				break;
			case "push!hand_left":
				pressKey(KeyEvent.VK_9);
				break;
				
			case "blocking":
				user.allowed = !user.allowed;
				log.info("BLOCKING: " + user.allowed + " NITEID: " + user.niteID);
				break;
				
				
			default:
				log.info("GestureAgent - received unknown Gesture");
			}


		} else if (message instanceof NewUser) {


			NewUser messageUser = (NewUser) message;
			User user = ASingleton.niteToUser.get(messageUser.getNiteID());
			// if already existent remove first
			if (user != null) {
				ASingleton.niteToUser.remove(messageUser.getNiteID());
			}
			user = new User(messageUser.getNiteID()); 
			ASingleton.niteToUser.put(messageUser.getNiteID(), user);
			log.info("NEW USER ID: " + user.getNiteID());
			String json = gson.toJson(user);
			ASingleton.sendData(ASingleton.Sockets.ADD_USER, json);
			
		} else if (message instanceof UserState) {
			
			log.info("USER STATE");
			UserState messageUser = (UserState) message;
			User user = ASingleton.niteToUser.get(messageUser.getNiteID());
			if (user == null) {
				user = ASingleton.niteToUser.put(messageUser.getNiteID(), new User(messageUser.getNiteID()));
			}
			user.userID = messageUser.getUserID();
			user.image = messageUser.getImage();
			String json = gson.toJson(user);
			ASingleton.sendData(ASingleton.Sockets.ADD_USER, json);
			
		} else if (message instanceof UserLeft) {
			log.info("USER LEFT");
			UserLeft messageUser = (UserLeft) message;
			User user = ASingleton.niteToUser.remove(messageUser.getNiteID());
			String json = gson.toJson(user);
			ASingleton.sendData(ASingleton.Sockets.REMOVE_USER, json);
		}
	}
		
	private void pressKey(int key) {
		r.keyPress(key);
		r.keyRelease(key);	
	}	
}
