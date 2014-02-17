package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;

import com.google.gson.Gson;

import ontology.Message;
import ontology.messages.GetTodoData;
import ontology.messages.TodoData;
import util.ASingleton;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;

public class TodoBean extends AbstractCommunicatingBean {

	String agentName = "TestAgent";
//	String agentName = "InformationAgent";
	private Action sendAction = null;
	Gson gson = new Gson();
	
	public void getTodos(int userID) {
		boolean send = false;

		// Retrieve all DatabaseMockupBeans
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = null;
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals(agentName)) {

				// create the message, get receiver's message box address
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				receiverID = agent.getAid();
				JiacMessage message = new JiacMessage(new GetTodoData(thisAgent.getAgentId(), receiverID, userID));
				// Invoke sendAction
				log.info("sending GetTodoData to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
				send = true;
			}
		}
		if (!send)
			log.warn("Can't send message. " + agentName + " not found!");	
	}


	@Override
	public void doStart() throws Exception {
		super.doStart();
		log.info("starting....");
		log.info("my ID: " + this.thisAgent.getAgentId());
		log.info("my Name: " + this.thisAgent.getAgentName());
		log.info("my Node: " + this.thisAgent.getAgentNode().getName());

		sendAction = retrieveAction(ICommunicationBean.ACTION_SEND);
		
		// yeeaaaah
		ASingleton.agents.add(this);

		if (sendAction == null)
			throw new RuntimeException("Send action not found.");

	}

	@Override
	protected void receiveMessage(Message message) {
		if(message instanceof TodoData){
			TodoData todo = ((TodoData) message);
			log.info("TodoAgent - received Todos");
			String json = gson.toJson(todo);
			ASingleton.sendData(ASingleton.Sockets.TODO, json);

		}
		
	}
}
