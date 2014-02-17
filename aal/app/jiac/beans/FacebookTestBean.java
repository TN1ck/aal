package jiac.beans;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import ontology.*;
import ontology.messages.*;

import org.sercho.masp.space.event.SpaceEvent;
import org.sercho.masp.space.event.SpaceObserver;
import org.sercho.masp.space.event.WriteCallEvent;

import de.dailab.jiactng.agentcore.AbstractAgentBean;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.IJiacMessage;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.knowledge.IFact;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IActionDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;



public class FacebookTestBean extends AbstractAgentBean{
	
	private IActionDescription sendAction = null;
	

	
	private long id = 0;
	private String accessToken = "fail";
	
	
	@Override
	public void doStart() throws Exception{
		super.doStart();
		log.info("started.");
		log.info("my ID: " + this.thisAgent.getAgentId());
		log.info("my Name: " + this.thisAgent.getAgentName());
		log.info("my Node: " + this.thisAgent.getAgentNode().getName());
		
		
		IActionDescription template = new Action(ICommunicationBean.ACTION_SEND);
		sendAction = memory.read(template);
		
		if(sendAction == null){
			sendAction = thisAgent.searchAction(template);
		}
		
		if(sendAction == null){
			throw new RuntimeException("Send action not found.");
		}
		
		memory.attach(new MessageObserver(), new JiacMessage());
	}
	
	
	private class MessageObserver implements SpaceObserver<IFact>{

		/**
		 * 
		 */
		private static final long serialVersionUID = -8182513339144469591L;

		@Override
		public void notify(SpaceEvent<? extends IFact> event) {
			if(event instanceof WriteCallEvent<?>){
				WriteCallEvent<IJiacMessage> wce = (WriteCallEvent<IJiacMessage>) event;
				
				log.info("message received");
				
				IJiacMessage message = memory.remove(wce.getObject());
				log.info(message);
				
				if(message != null){
					IFact obj = message.getPayload();
					if (obj instanceof GetFacebookData) {
						
						obj = (GetFacebookData) obj;
						try {
							
							List<IAgentDescription> agentDescriptions = thisAgent.searchAllAgents(new AgentDescription());

							for(IAgentDescription agent : agentDescriptions){
								if(agent.getName().equals("SocialMediaAgent")){

									IMessageBoxAddress receiver = agent.getMessageBoxAddress();
									
							
									log.info("sending empty FacebookData to: " + receiver);
									
									
									FacebookData mess = new FacebookData(thisAgent.getAgentId(),agent.getAid());
									mess.setName("Bert");
									JiacMessage newMessage = new JiacMessage(mess);
									
									invoke(sendAction, new Serializable[] {newMessage, receiver});
								}
							}
							
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					else{
						memory.write(wce.getObject());
					}
					
				}
			}
			
		}
		
	}

}
