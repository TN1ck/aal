package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;

import de.dailab.jiactng.agentcore.AbstractAgentBean;
import models.TodoItem;

import org.sercho.masp.space.event.SpaceEvent;
import org.sercho.masp.space.event.SpaceObserver;
import org.sercho.masp.space.event.WriteCallEvent;

import play.libs.Json;
import play.libs.F.Function0;
import play.libs.F.Promise;

import com.fasterxml.jackson.databind.JsonNode;

import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.IJiacMessage;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.knowledge.IFact;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;
import ontology.Message;
import ontology.MessageType;
import ontology.messages.*;

import java.awt.*;
import java.awt.event.KeyEvent;

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
			JsonNode json = Json.toJson(TodoItem.find.all());
				JiacMessage result = new JiacMessage(new DatabaseQuery(thisAgent.getAgentId(), message.getSenderID(), "GET_TODOS"));
				System.out.println("trying to send: " + thisAgent.getAgentId() + ' ' + message.getSenderID());
				ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
				for (IAgentDescription agent : agentDescriptions) {
					System.out.println(agent.getName());
					if (agent.getName().equals("TodoAgent")) {

						// create the message, get receiver's message box address
						IMessageBoxAddress receiver = agent.getMessageBoxAddress();
						JiacMessage test = new JiacMessage(new TodoData(thisAgent.getAgentId(), agent.getAid(), -1, Json.toJson(TodoItem.find.all())));

						// Invoke sendAction
						log.info("DatabaseQuery - sending fuck to: " + receiver);
						invoke(sendAction, new Serializable[] { test, receiver });
					}
				}

		} else {
			log.info("received wrong message");
		}


		// TODO Auto-generated method stub
		/*int query = ((GetTodoData) message).getQuery();
		log.info("DatabaseMockupBean - Query received: " + query);	

		switch(query) {
			case "GET_TODOS":
				JsonNode json = Json.toJson(TodoItem.find.all());
				JiacMessage result = new JiacMessage(new DatabaseQuery(thisAgent.getAgentId(), message.getSenderID(), "GET_TODOS"));
				System.out.println("trying to send: " + thisAgent.getAgentId() + ' ' + message.getSenderID());
//				invoke(sendAction, new Serializable[] {result, message.getSenderID() });
				ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
				for (IAgentDescription agent : agentDescriptions) {
					System.out.println(agent.getName());
					if (agent.getName().equals("TodoAgent")) {

						// create the message, get receiver's message box address
						IMessageBoxAddress receiver = agent.getMessageBoxAddress();
						JiacMessage test = new JiacMessage(new DatabaseQuery(thisAgent.getAgentId(), agent.getAid(), "GET_TODOS"));

						// Invoke sendAction
						log.info("DatabaseQuery - sending fuck to: " + receiver);
						invoke(sendAction, new Serializable[] { test, receiver });
					}
				}
				break; 
			default:
				log.info("GestureAgent - received unknown Gesture"); */

	}
}