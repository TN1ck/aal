package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;

import ontology.Message;
import ontology.messages.GetTodoData;
import ontology.messages.TodoData;
import ontology.messages.TodoData.TodoItem;
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
	
	public void getTodos(int userID, int ID) {
		boolean send = false;
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = null;
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals(agentName)) {
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

	public void execute() {
		ArrayList<TodoItem> bla = new ArrayList<TodoItem>();
		TodoData mess = new TodoData("from","to",-1,bla);
		
		//(String discription, String name, Date startTime, Date endTime, String location)
		bla.add(mess.new TodoItem(0, "Finish the weekly presentation for tomorrow", "red", new Date()));
		bla.add(mess.new TodoItem(0, "Make a prototype of the pitch you have to hold in a month", "red", new Date()));
		bla.add(mess.new TodoItem(0, "Buy everything for that dinner tonight", "red", new Date()));
		bla.add(mess.new TodoItem(0, "more data", "red", new Date()));
		bla.add(mess.new TodoItem(0, "so much more", "red", new Date()));
		bla.add(mess.new TodoItem(0, "so much more", "red", new Date()));
		bla.add(mess.new TodoItem(0, "so much more", "red", new Date()));
		bla.add(mess.new TodoItem(0, "so much more", "red", new Date()));
		mess.setItems(bla);
		ASingleton.sendData(ASingleton.Sockets.TODO, gson.toJson(mess));
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
