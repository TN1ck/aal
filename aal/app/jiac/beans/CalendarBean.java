package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;

import ontology.Message;
import ontology.messages.*;
import ontology.messages.CalendarData.Entry;

import util.ASingleton;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;



public class CalendarBean extends AbstractCommunicatingBean {

	private Action sendAction = null;
	private String agentName = "InformationAgent";
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
	
	public void getCalendarData(int userID) {
		boolean send = false;
		
		// Retrieve all DatabaseMockupBeans
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = null;
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals(agentName)) {

				// create the message, get receiver's message box address
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				receiverID = agent.getAid();
				JiacMessage message = new JiacMessage(new GetCalendarData(thisAgent.getAgentId(), receiverID, userID));
				// Invoke sendAction
				log.info("sending GetCalendarData to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
				send = true;
			}
		}
		
		if (!send)
			log.warn("Can't send message. " + agentName + " not found!");
	}
	
	public void updateCalendarData(int userID) {
		boolean send = false;
		
		// Retrieve all DatabaseMockupBeans
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = null;
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals(agentName)) {

				// create the message, get receiver's message box address
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				receiverID = agent.getAid();
				CalendarData c = new CalendarData("","",-1,null);
				Entry newEntry = c.new Entry("","",new Date(), new Date(),"");
				
				// TODO: fill new entry
				
				JiacMessage message = new JiacMessage(new UpdateCalendarData(thisAgent.getAgentId(), receiverID, userID,newEntry));
				// Invoke sendAction
				log.info("sending GetCalendarData to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
				send = true;
			}
		}
		
		if (!send)
			log.warn("Can't send message. " + agentName + " not found!");
	}
	
	public void execute() {
		ArrayList<Entry> bla = new ArrayList<Entry>();
		CalendarData mess = new CalendarData("from","to",-1,bla);
		log.info("exec");
		
		//(String discription, String name, Date startTime, Date endTime, String location)
		bla.add(mess.new Entry("weekly presentation in aal. Present Jiac-integeration, login-screens, gesture-integration.", "aal", new Date(), new Date(), "tel 11xx"));
		bla.add(mess.new Entry("Meeting with investors - be nice to them, we need them.", "aal2", new Date(), new Date(), "ER 270"));
		bla.add(mess.new Entry("Dinner tonight", "aal2", new Date(), new Date(), "fancy restaurant"));
		bla.add(mess.new Entry("more data", "aal2", new Date(), new Date(), "tel 14xx"));
		bla.add(mess.new Entry("so much more", "aal2", new Date(), new Date(), "tel 14xx"));
		bla.add(mess.new Entry("so much more", "aal2", new Date(), new Date(), "tel 14xx"));
		bla.add(mess.new Entry("so much more", "aal2", new Date(), new Date(), "tel 14xx"));
		bla.add(mess.new Entry("so much more", "aal2", new Date(), new Date(), "tel 14xx"));
		mess.setEntries(bla);
		log.info("CALENDAR EXAMPLE JSON: " + gson.toJson(mess));
		ASingleton.sendData(ASingleton.Sockets.CALENDAR, gson.toJson(mess));
	} 

	@Override
	protected void receiveMessage(Message message) {
		if(message instanceof CalendarData){
			CalendarData cal = ((CalendarData) message);
			log.info("received Calendar Data");
			String json = gson.toJson(cal);
			ASingleton.sendData(ASingleton.Sockets.CALENDAR, json);
		}
	}
}

