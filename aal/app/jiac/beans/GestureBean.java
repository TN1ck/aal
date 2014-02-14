package jiac.beans;

import java.io.Serializable;

import de.dailab.jiactng.agentcore.AbstractAgentBean;

import de.dailab.jiactng.agentcore.action.Action;
import org.sercho.masp.space.event.SpaceEvent;
import org.sercho.masp.space.event.SpaceObserver;
import org.sercho.masp.space.event.WriteCallEvent;



import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.IJiacMessage;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.knowledge.IFact;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;
import jiac.Message;
import ontology.messages.*;
import jiac.Message;
import ontology.messages.*;

import java.awt.*;
import java.awt.event.KeyEvent;

public class GestureBean extends AbstractCommunicatingBean {

	private Action sendAction = null;
	Robot r = null;

	@Override
	public void doStart() throws Exception {
		super.doStart();
		log.info("starting....");
		log.info("my ID: " + this.thisAgent.getAgentId());
		log.info("my Name: " + this.thisAgent.getAgentName());
		log.info("my Node: " + this.thisAgent.getAgentNode().getName());

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
			switch(gesture) {
			case "MENU": 
				pressKey(KeyEvent.VK_2);
				break;
			case "ESCAPE": 
				pressKey(KeyEvent.VK_ESCAPE);
				break;
			case "TAB_Right": 
				pressKey(KeyEvent.VK_RIGHT);
				break;
			case "TAB_LEFT":
				pressKey(KeyEvent.VK_LEFT);
				break;
			case "TAB_DOWN":
				pressKey(KeyEvent.VK_DOWN);
				break;
			case "ENTER":
				pressKey(KeyEvent.VK_ENTER);
				break;
			default:
				log.info("GestureAgent - received unknown Gesture");
			}


		}
	}
		
	private void pressKey(int key) {
		r.keyPress(key);
		r.keyRelease(key);	
	}	
}
