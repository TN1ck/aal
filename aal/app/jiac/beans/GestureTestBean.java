package jiac.beans;


import java.io.Serializable;
import java.util.List;
import java.util.Set;

import de.dailab.jiactng.agentcore.AbstractAgentBean;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.IJiacMessage;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;

import jiac.messages.*;


public class GestureTestBean extends AbstractAgentBean {

	private Action sendAction = null;

	@Override
	public void doStart() throws Exception {
		super.doStart();
		log.info("GestureTestBean - starting....");
		log.info("GestureTestBean - my ID: " + this.thisAgent.getAgentId());
		log.info("GestureTestBean - my Name: " + this.thisAgent.getAgentName());
		log.info("GestureTestBean - my Node: " + this.thisAgent.getAgentNode().getName());

		// Retrieve send action provided by CommunicationBean
		sendAction = retrieveAction(ICommunicationBean.ACTION_SEND);

		// If no send action is available, check your agent configuration.
		// CommunicationBean is needed
		if (sendAction == null)
			throw new RuntimeException("Send action not found.");
		//memory.attach(new MessageObserver(), new JiacMessage());
	}

	@Override
	public void execute() {

		// Retrieve all PongAgents
		List<IAgentDescription> agentDescriptions = thisAgent.searchAllAgents(new AgentDescription());

		// Send a 'Ping' to each of the PongAgents
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals("GestureAgent")) {

				// create the message, get receiver's message box address
				JiacMessage message = new JiacMessage(new Gesture("MENU"));
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();

				// Invoke sendAction
				log.info("GestureTestAgent - sending Gesture to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
			}
		}
	}


}
