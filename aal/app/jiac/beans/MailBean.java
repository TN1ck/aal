package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;

import ontology.Message;
import ontology.messages.*;
import ontology.messages.MailData.Mail;
import util.ASingleton;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;



public class MailBean extends AbstractCommunicatingBean {

	private Action sendAction = null;
	private String agentName = "CommunicationAgent";
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
	
	public void getMailData(int userID) {
		boolean send = false;
		
		// Retrieve all DatabaseMockupBeans
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = null;
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals(agentName)) {

				// create the message, get receiver's message box address
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				receiverID = agent.getAid();
				JiacMessage message = new JiacMessage(new GetMailData(thisAgent.getAgentId(), receiverID, userID));
				// Invoke sendAction
				log.info("sending GetMailData to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
				send = true;
			}
		}
		
		if (!send)
			log.warn("Can't send message. " + agentName + " not found!");
	}
	
	public void writeMail(int userID) {
		// TODO
	}
	
	public void execute() {
		log.info("exec mail");
		MailData newMailMessage = new MailData("","",-1,null);
		ArrayList<Mail> mails = new ArrayList<Mail>();
		mails.add(newMailMessage.new Mail("new Subject","i am text","private","jonny", new Date()));
		newMailMessage.setMails(mails);
		receiveMessage(newMailMessage);
	}
	

	@Override
	protected void receiveMessage(Message message) {
		if(message instanceof MailData){
			MailData mail = ((MailData) message);
			log.info("received Mail Data");
			String json = gson.toJson(mail);
			ASingleton.sendData(ASingleton.Sockets.MAIL, json);
		}
	}
}

