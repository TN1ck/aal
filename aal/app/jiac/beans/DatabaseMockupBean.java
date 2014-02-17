package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

//import models.TodoItem;
import ontology.Message;
import ontology.messages.GetTodoData;
import ontology.messages.TodoData;
import ontology.messages.TodoData.TodoItem;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;

public class DatabaseMockupBean extends AbstractCommunicatingBean {

	private Action sendAction = null;
	
	@Override
	public void doStart() throws Exception {
		super.doStart();
		log.info("DatabaseMockupBean - starting....");
		log.info("DatabaseMockupBean - my ID: " + this.thisAgent.getAgentId());
		log.info("DatabaseMockupBean - my Name: " + this.thisAgent.getAgentName());
		log.info("DatabaseMockupBean - my Node: " + this.thisAgent.getAgentNode().getName());
		
		sendAction = retrieveAction(ICommunicationBean.ACTION_SEND);

		if (sendAction == null) 
			throw new RuntimeException("Send action not found.");
		
	}

	@Override
	protected void receiveMessage(Message message) {
		if (message instanceof GetTodoData) {
			System.out.println("trying to send: " + thisAgent.getAgentId() + ' ' + message.getSenderID());
				ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
				for (IAgentDescription agent : agentDescriptions) {
					System.out.println(agent.getName());
					if (agent.getName().equals("InformationAgent")) {

						// create the message, get receiver's message box address
						IMessageBoxAddress receiver = agent.getMessageBoxAddress();
						
						ArrayList<TodoItem> items = new ArrayList<TodoItem>();
						TodoData mess = new TodoData(thisAgent.getAgentId(), agent.getAid(), -1,items);
						
						TodoItem item = mess.new TodoItem(0,"awesome todo","LOW",new Date());
						items.add(item);
						mess.setItems(items);
						JiacMessage test = new JiacMessage(mess);

						// Invoke sendActionJson.toJson(TodoItem.find.all()
						log.info("DatabaseQuery - sending fuck to: " + receiver);
						invoke(sendAction, new Serializable[] { test, receiver });
					}
				}

		} else {
			log.info("received wrong message");
		}
	}
}