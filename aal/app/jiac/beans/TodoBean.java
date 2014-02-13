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
import play.libs.F.Function0;
import play.libs.F.Promise;
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
import jiac.Message;
import jiac.messages.*;

import java.awt.*;
import java.awt.event.KeyEvent;

public class TodoBean extends AbstractCommunicatingBean {

	private Action sendAction = null;
	public Message currentMessage = null;
	
	public Promise<JsonNode> getTodos() {
		
		final String senderId = "0";
		
		Promise<JsonNode> promise = Promise.promise(
			new Function0<JsonNode>() {
				public JsonNode apply() {

					System.out.println("Resolving promise in Jiac...");
					// Retrieve all DatabaseMockupBeans
					ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
					
					String receiverID = "0";
					// Send a 'Ping' to each of the PongAgents
					for (IAgentDescription agent : agentDescriptions) {
						if (agent.getName().equals("DatabaseMockupAgent")) {

							// create the message, get receiver's message box address
							IMessageBoxAddress receiver = agent.getMessageBoxAddress();
							receiverID = agent.getAid();
							JiacMessage message = new JiacMessage(new DatabaseQuery(thisAgent.getAgentId(), receiverID, "GET_TODOS"));

							// Invoke sendAction
							log.info("DatabaseQuery - sending fuck to: " + receiver);
							invoke(sendAction, new Serializable[] { message, receiver });
						}
					}

					IJiacMessage template = new JiacMessage(new DatabaseQuery(thisAgent.getAgentId(), receiverID, "GET_TODOS"));
					
					Set<IJiacMessage> messages = memory.removeAll(template);
					
					while(currentMessage == null) {
						try {
							Thread.sleep(1000);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						System.out.println("TodoAgent - nothing here");
					}

					System.out.println("TodoBean - Found a message! " + messages.toString());
					currentMessage = null;
					return Json.toJson(TodoItem.find.all());


				}
			}
		);
		
		return promise;
	
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
		// TODO Auto-generated method stub
		currentMessage = message;
		log.info("TodoBean - received receiveMessage");
		
	}
}
