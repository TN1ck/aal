package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;
import ontology.Message;
import ontology.messages.FacebookData;
import ontology.messages.GetFacebookData;
import util.ASingleton;
import com.google.gson.Gson;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;

public class FacebookBean extends AbstractCommunicatingBean {

	String agentName = "SocialMediaAgent";
//	String agentName = "TestAgent";
	private Action sendAction = null;
	Gson gson = new Gson();


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
	

	public void getFacebookData(int userID, String accessToken) {
		log.info("get facebook - token: " + accessToken);
		boolean send = false;
		// Retrieve all DatabaseMockupBeans
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = null;
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals(agentName)) {
				// create the message, get receiver's message box address
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				receiverID = agent.getAid();
				JiacMessage message = new JiacMessage(new GetFacebookData(thisAgent.getAgentId(), receiverID, userID, accessToken));
				// Invoke sendAction
				log.info("sending GetFacebookData to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
				send = true;
			}
		}
		if (!send)
			log.warn("Can't send message. " + agentName + " not found!");
	}
	
	public void execute() {
	//	log.info("exec");
	//	getFacebookData(-1,"CAAE37iCgdwwBAJVwB7jwa3oK25qK0vJ05dscGzKEbu97VxmmZAEnvD0B7Amz2yFIiW6ZCz9TAlJ4ToekzbBQGb7RWaQe5JK22v4KGGDavKLI84XzKLG3ju7qk7ZCwzYyje7DoJqGGHsKTzdY1G27Ajyx8n6gZBxBStc9ZC7uWuCHiLwmUCwF7B6NjSrbJWTgZD");
	}

	@Override
	protected void receiveMessage(Message message) {
		if(message instanceof FacebookData){
			FacebookData data = ((FacebookData) message);
			log.info("received FacebookData");
			String json = gson.toJson(data);
			//log.info(json);
			ASingleton.sendData(ASingleton.Sockets.FACEBOOK, json);
		}
	}
}