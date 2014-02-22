package jiac.beans;

import static de.dailab.jiactng.agentcore.comm.CommunicationAddressFactory.createGroupAddress;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.io.Serializable;

import ontology.Message;
import ontology.messages.Gesture;
import ontology.messages.NewUser;
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

	@Override
	protected void receiveMessage(Message message) {
		
		if(message instanceof Gesture){
			String gesture = ((Gesture) message).getGesture();
			log.info("GestureAgent - received Gesture: " + gesture);
			ASingleton.sendData(ASingleton.Sockets.DEBUG_KEYS, gesture);
			switch(gesture) {
			case "screen_toggle": 
				pressKey(KeyEvent.VK_2);
				break;
			case "tab_up!hand_right": 
				pressKey(KeyEvent.VK_UP);
				break;
			case "tab_right!hand_right": 
				pressKey(KeyEvent.VK_RIGHT);
				break;
			case "tab_left!hand_right":
				pressKey(KeyEvent.VK_LEFT);
				break;
			case "tab_down!hand_right":
				pressKey(KeyEvent.VK_DOWN);
				break;
			case "push|hand_right":
				pressKey(KeyEvent.VK_ENTER);
				break;
			default:
				log.info("GestureAgent - received unknown Gesture");
			}


		} else if (message instanceof NewUser) {
			
		} else if (message instanceof UserState) {
			
		} else if (message instanceof UserLeft) {
			
		}
	}
		
	private void pressKey(int key) {
		r.keyPress(key);
		r.keyRelease(key);	
	}	
}
