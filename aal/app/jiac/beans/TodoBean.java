package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Set;

import de.dailab.jiactng.agentcore.AbstractAgentBean;
import models.TodoItem;

import org.sercho.masp.space.event.SpaceEvent;
import org.sercho.masp.space.event.SpaceObserver;
import org.sercho.masp.space.event.WriteCallEvent;

import play.libs.Json;
import play.libs.F.Promise;
import play.libs.F.Function0;
import util.ASingleton;

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

public class TodoBean extends AbstractCommunicatingBean {

	private Action sendAction = null;
	public Message currentMessage = null;
	
	public void getTodos() {

		// Retrieve all DatabaseMockupBeans
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = "0";
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals("DatabaseMockupAgent")) {

				// create the message, get receiver's message box address
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				receiverID = agent.getAid();
				JiacMessage message = new JiacMessage(new GetTodoData(thisAgent.getAgentId(), receiverID, -1));
				// Invoke sendAction
				log.info("DatabaseQuery - sending GET_TODO to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
			}
		}
		
	
	}


	@Override
	public void doStart() throws Exception {
		super.doStart();
		log.info("TodoBean - starting....");
		log.info("TodoBean - my ID: " + this.thisAgent.getAgentId());
		log.info("TodoBean - my Name: " + this.thisAgent.getAgentName());
		log.info("TodaBean - my Node: " + this.thisAgent.getAgentNode().getName());

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
			String json = "test test test";
			ASingleton.sendData(ASingleton.Sockets.TODO, json);

		}
		
	}
}
