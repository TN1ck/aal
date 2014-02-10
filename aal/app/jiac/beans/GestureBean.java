package jiac.beans;

import java.io.Serializable;

import de.dailab.jiactng.agentcore.AbstractAgentBean;

import org.sercho.masp.space.event.SpaceEvent;
import org.sercho.masp.space.event.SpaceObserver;
import org.sercho.masp.space.event.WriteCallEvent;

import de.dailab.jiactng.agentcore.comm.message.IJiacMessage;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.knowledge.IFact;

import jiac.messages.*;
import java.awt.*;
import java.awt.Robot;
import java.awt.event.KeyEvent;

public class GestureBean extends AbstractAgentBean {


	@Override
	public void doStart() throws Exception {
		super.doStart();
		log.info("GestureBean - starting....");
		log.info("GestureBean - my ID: " + this.thisAgent.getAgentId());
		log.info("GestureBean - my Name: " + this.thisAgent.getAgentName());
		log.info("GestureBean - my Node: " + this.thisAgent.getAgentNode().getName());

		memory.attach(new MessageObserver(), new JiacMessage());
	}

	@SuppressWarnings("serial")
	private class MessageObserver implements SpaceObserver<IFact> {

		@Override
		public void notify(SpaceEvent<? extends IFact> event) {
			if(event instanceof WriteCallEvent<?>){
				WriteCallEvent<IJiacMessage> wce = (WriteCallEvent<IJiacMessage>) event;
				
				log.info("GestureAgent - message received");
				
				IJiacMessage message = memory.remove(wce.getObject());
				IFact obj = message.getPayload();
				
				if(obj instanceof Gesture){
					String gesture = ((Gesture) obj).getGesture();
					log.info("GestureAgent - received Gesture: " + gesture);
					

					Robot r = null;
					try {
						r = new Robot();
					} catch (AWTException e) {
						log.info("GestureAgent - ERROR: Can not create Robot for Key Input");
						e.printStackTrace();
					}

					switch(gesture) {
						case "MENU": 
							r.keyPress(KeyEvent.VK_2);
							r.keyRelease(KeyEvent.VK_2);
							break;
						default:
							log.info("GestureAgent - received unknown Gesture: ");

					}


				}
				
//				JiacMessage sendMessage = new JiacMessage();
//				
//				invoke(sendAction, new Serializable[]{sendMessage, message.getSender()});
			}
			
		}
	}
}