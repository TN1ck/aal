package jiac.pingpong;

import java.io.Serializable;

import org.sercho.masp.space.event.SpaceEvent;
import org.sercho.masp.space.event.SpaceObserver;
import org.sercho.masp.space.event.WriteCallEvent;

import de.dailab.jiactng.agentcore.AbstractAgentBean;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.message.IJiacMessage;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.knowledge.IFact;

public class PongBean extends AbstractAgentBean {

	private Action sendAction = null;

	@Override
	public void doStart() throws Exception {
		super.doStart();
		log.info("PingAgent - starting....");
		log.info("PingAgent - my ID: " + this.thisAgent.getAgentId());
		log.info("PingAgent - my Name: " + this.thisAgent.getAgentName());
		log.info("PingAgent - my Node: " + this.thisAgent.getAgentNode().getName());

		// Retrieve send action provided by CommunicationBean
		sendAction = retrieveAction(ICommunicationBean.ACTION_SEND);

		// If no send action is available, check your agent configuration.
		// CommunicationBean is needed
		if (sendAction == null) 
			throw new RuntimeException("Send action not found.");

		// listen to memory events, see MessageObserver implementation below
		memory.attach(new MessageObserver(), new JiacMessage(new Ping("ping")));
	}

	@SuppressWarnings("serial")
	private class MessageObserver implements SpaceObserver<IFact> {

		@SuppressWarnings("unchecked")
		public void notify(SpaceEvent<? extends IFact> event) {
			if (event instanceof WriteCallEvent<?>) {
				WriteCallEvent<IJiacMessage> wce = (WriteCallEvent<IJiacMessage>) event;
				// a JiacMessage holding a Ping with message 'Ping' has been 
				// written to this agent's memory
				log.info("PongAgent - ping received");

				// consume message
				IJiacMessage message = memory.remove(wce.getObject());

				// create answer: a JiacMessage holding a Ping with message 'pong'
				JiacMessage pongMessage = new JiacMessage(new Ping("pong"));

				// send Pong to PingAgent (the sender of the original message)
				log.info("PongAgent - sending pong message");
				invoke(sendAction, new Serializable[] { pongMessage,
						message.getSender() });
			}
		}
	}

}
