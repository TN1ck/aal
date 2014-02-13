package jiac.beans;

import java.io.Serializable;

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
import de.dailab.jiactng.agentcore.comm.message.IJiacMessage;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.knowledge.IFact;
import jiac.Message;
import jiac.messages.*;

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
		// TODO Auto-generated method stub
		String query = ((DatabaseQuery) message).getQuery();
		log.info("DatabaseMockupBean - Query received: " + query);	

		switch(query) {
			case "GET_TODOS":
				JsonNode json = Json.toJson(TodoItem.find.all());
				JiacMessage result = new JiacMessage(new DatabaseQuery(thisAgent.getAgentId(), message.getSenderID(), "GET_TODOS"));
				invoke(sendAction, new Serializable[] {result, message.getSenderID() });
				break;
			default:
				log.info("GestureAgent - received unknown Gesture");

		}
	}
}