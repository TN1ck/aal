package jiac.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

import ontology.Message;
import ontology.messages.*;
import ontology.messages.CalendarData.Entry;
//import ontology.messages.objects.NewsFeedMessage;
import ontology.messages.NewsFeedData.NewsFeedMessage;
import util.ASingleton;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.ICommunicationBean;
import de.dailab.jiactng.agentcore.comm.IMessageBoxAddress;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.ontology.AgentDescription;
import de.dailab.jiactng.agentcore.ontology.IAgentDescription;



public class NewsBean extends AbstractCommunicatingBean {

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
	
	public void getNewsData() {
		boolean send = false;
		
		// Retrieve all DatabaseMockupBeans
		ArrayList<IAgentDescription> agentDescriptions = (ArrayList<IAgentDescription>) thisAgent.searchAllAgents(new AgentDescription());
		
		String receiverID = null;
		for (IAgentDescription agent : agentDescriptions) {
			if (agent.getName().equals(agentName)) {

				// create the message, get receiver's message box address
				IMessageBoxAddress receiver = agent.getMessageBoxAddress();
				receiverID = agent.getAid();
				JiacMessage message = new JiacMessage(new GetNewsData(thisAgent.getAgentId(), receiverID));
				// Invoke sendAction
				log.info("sending GetNewsData to: " + receiver);
				invoke(sendAction, new Serializable[] { message, receiver });
				send = true;
			}
		}
		
		if (!send)
			log.warn("Can't send message. " + agentName + " not found!");
		
	/*	// sending some test data
		NewsFeedData testMess = new NewsFeedData(0l,"","",null);
		NewsFeedMessage news1 = testMess.new NewsFeedMessage();
		news1.setTitle("I am a Header");
		news1.setDescription("some very very important news");
		
		NewsFeedMessage news2 = testMess.new NewsFeedMessage();
		news2.setTitle("Breaking News");
		news2.setDescription("The sun is shining");
		
		ArrayList<NewsFeedMessage> news = new ArrayList<NewsFeedMessage>();
		news.add(news1);
		news.add(news2);
		testMess.setNewsFeed(news);
		receiveMessage(testMess);
		
		*/
	}
	
	
	
/*	public void execute() {
		ArrayList<Entry> bla = new ArrayList<Entry>();
		NewsFeedData mess = new NewsFeedData("from","to",-1,bla);
		log.info("exec");
		
		//(String discription, String name, Date startTime, Date endTime, String location)
		bla.add(mess.new Entry("weekly presentation in aal. Present Jiac-integeration, login-screens, gesture-integration.", "aal", date, date, "tel 11xx",0));
		bla.add(mess.new Entry("Meeting with investors - be nice to them, we need them.", "aal2", date, date, "ER 270",0));
		bla.add(mess.new Entry("Dinner tonight", "aal2", date, date, "fancy restaurant",0));
		bla.add(mess.new Entry("more data", "aal2", date, date, "tel 14xx",0));
		bla.add(mess.new Entry("so much more", "aal2", date, date, "tel 14xx",0));
		bla.add(mess.new Entry("so much more", "aal2", date, date, "tel 14xx",0));
		bla.add(mess.new Entry("so much more", "aal2", date, date, "tel 14xx",0));
		bla.add(mess.new Entry("so much more", "aal2", date, date, "tel 14xx",0));
		mess.setEntries(bla);
		log.info("CALENDAR EXAMPLE JSON: " + gson.toJson(mess));
		ASingleton.sendData(ASingleton.Sockets.CALENDAR, gson.toJson(mess));
	} */

	@Override
	protected void receiveMessage(Message message) {
		if(message instanceof NewsFeedData){
			NewsFeedData news = ((NewsFeedData) message);
			log.info("received News Data");
			String json = gson.toJson(news);
			ASingleton.sendData(ASingleton.Sockets.NEWS, json);
		}
	}
}

