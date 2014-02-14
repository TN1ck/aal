package jiac.beans;

import java.io.Serializable;
import java.util.List;

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

public class FacebookBean extends AbstractAgentBean{
	
	private IActionDescription sendAction = null;
	private String accessToken = "CAACEdEose0cBAAF5TiiaZCS7fBez03qUETurZAs0suBnNFo1jK97KbSfZBZCG0uGxOmgLxTis5x3HygbZBHeOwuNwh5w7NrpjzIt001GUfrXCcSXfhDPVEvM4O3NSj1U7dPcDLadezyn7ApBc1rDA3BUGBmUezzfagJeamNAqmxpf5zRvHJ0JZB96BLSkcNiIZD";
	
	private String accessTokenValue = "9f511c7f-c2a8-446f-bde8-99f6d16275ac";
	private String tokenSecretValue = "f9519a5a-902d-4ac6-88f6-e50eb0563c4b";
	
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
	
	@Override
	public void execute(){

		List<IAgentDescription> agentDescriptions = thisAgent.searchAllAgents(new AgentDescription());

		for(IAgentDescription agent : agentDescriptions){
			if(agent.getName().equals("SocialMediaAgent")){

				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				JiacMessage message =  new JiacMessage(new GetFacebookData(thisAgent.getAgentId(),agent.getAid(),-1, accessToken));
				
				log.info("sending GetFacebookData to: " + receiver);
				invoke(sendAction, new Serializable[] {message, receiver});
			}
		}
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
				
				log.info("FacebookAgent - message received");
				
				IJiacMessage message = memory.remove(wce.getObject());

				
				if(message != null){
					IFact obj = message.getPayload();
					 
					if(obj instanceof FacebookData){
						try {
							
							log.info("Success: " +  ((FacebookData) obj).getMe().getName());
							log.info("pic " +  ((FacebookData) obj).getPicture());

							
							
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