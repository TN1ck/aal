package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import ontology.Message;
import ontology.messages.*;

import org.sercho.masp.space.event.SpaceEvent;
import org.sercho.masp.space.event.SpaceObserver;
import org.sercho.masp.space.event.WriteCallEvent;

import util.ASingleton;
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

import com.google.gson.Gson;

public class FacebookBean extends AbstractCommunicatingBean {

	private Action sendAction = null;
	public Message currentMessage = null;
	Gson gson = new Gson();
	
	public void getFacebookData(int userID, String accessToken) {

		// Retrieve all DatabaseMockupBeans
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = null;
		for (IAgentDescription agent : agentDescriptions) {
			//if (agent.getName().equals("FacebookTestAgent")) {
			if (agent.getName().equals("SocialMediaAgent")) {
				// create the message, get receiver's message box address
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				receiverID = agent.getAid();
				JiacMessage message = new JiacMessage(new GetFacebookData(thisAgent.getAgentId(), receiverID, userID, accessToken));
				// Invoke sendAction
				log.info("sending GetFacebookData to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
			}
		}
	}
	
	public void execute() {
		log.info("exec");
		getFacebookData(-1,"CAAE37iCgdwwBAJVwB7jwa3oK25qK0vJ05dscGzKEbu97VxmmZAEnvD0B7Amz2yFIiW6ZCz9TAlJ4ToekzbBQGb7RWaQe5JK22v4KGGDavKLI84XzKLG3ju7qk7ZCwzYyje7DoJqGGHsKTzdY1G27Ajyx8n6gZBxBStc9ZC7uWuCHiLwmUCwF7B6NjSrbJWTgZD");
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
		if(message instanceof FacebookData){
			FacebookData data = ((FacebookData) message);
			log.info("received FacebookData");
			String json = gson.toJson(data);;
			ASingleton.sendData(ASingleton.Sockets.FACEBOOK, json);

		}
		
	}
	
}

/*public class FacebookBean extends AbstractAgentBean{
	
	private IActionDescription sendAction = null;
	private String accessToken = "CAACEdEose0cBAAF5TiiaZCS7fBez03qUETurZAs0suBnNFo1jK97KbSfZBZCG0uGxOmgLxTis5x3HygbZBHeOwuNwh5w7NrpjzIt001GUfrXCcSXfhDPVEvM4O3NSj1U7dPcDLadezyn7ApBc1rDA3BUGBmUezzfagJeamNAqmxpf5zRvHJ0JZB96BLSkcNiIZD";
	
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
		log.info("exec");
		List<IAgentDescription> agentDescriptions = thisAgent.searchAllAgents(new AgentDescription());

		for(IAgentDescription agent : agentDescriptions){
			if(agent.getName().equals("FacebookTestAgent")){

				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				JiacMessage message =  new JiacMessage(new GetFacebookData(thisAgent.getAgentId(),agent.getAid(),-1, accessToken));
				
				log.info("sending GetFacebookData to: " + receiver);
				invoke(sendAction, new Serializable[] {message, receiver});
			}
		}
	}
	
	private class MessageObserver implements SpaceObserver<IFact>{
		private static final long serialVersionUID = -8182513339144469591L;

		@Override
		public void notify(SpaceEvent<? extends IFact> event) {
			if(event instanceof WriteCallEvent<?>){
				@SuppressWarnings("unchecked")
				WriteCallEvent<IJiacMessage> wce = (WriteCallEvent<IJiacMessage>) event;
				
				log.info("message received");
				
				IJiacMessage message = memory.remove(wce.getObject());

				
				if(message != null){
					IFact obj = message.getPayload();
					 
					if(obj instanceof FacebookData){
						try {
							
							log.info("Success: " +  ((FacebookData) obj).getName());

							
							
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

} */