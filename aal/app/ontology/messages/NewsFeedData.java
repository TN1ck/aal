package ontology.messages;

import java.util.List;

import ontology.Message;
import ontology.MessageType;
import de.dailab.jiactng.agentcore.knowledge.IFact;

public class NewsFeedData extends Message {

	private long id;
	List<NewsFeedMessage> news;

	public NewsFeedData(long id, String senderID, String receiverID,
			List<NewsFeedMessage> news) {
		super(senderID, receiverID, MessageType.INFO_DATA);
		this.id = id;
		this.news = news;
	}

	public long getID() {
		return id;
	}

	public void setID(long id) {
		this.id = id;
	}

	public List<NewsFeedMessage> getNewsFeed() {
		return news;
	}

	public void setNewsFeed(List<NewsFeedMessage> news) {
		this.news = news;
	}

	public class NewsFeedMessage {
		String title;
		String description;
		String link;
		String author;
		String guid;
		String enclosure;

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getLink() {
			return link;
		}

		public void setLink(String link) {
			this.link = link;
		}

		public String getEnclosure() {
			return enclosure;
		}

		public void setEnclosure(String enclosure) {
			this.enclosure = enclosure;
		}

		@Override
		public String toString() {
			return "FeedMessage [TITLE=" + title + ", DESCRIPTION="
					+ description + ", LINK=" + link + ", ENCLOSURE="
					+ enclosure + "]";
		}

	}

}