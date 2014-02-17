package ontology.messages;

import java.util.ArrayList;
import java.util.Date;

import ontology.Message;
import ontology.MessageType;

public class MailData extends Message {
	
	private static final long serialVersionUID = -145889621738741918L;
	int userID;
	private ArrayList<Mail> mails;

	public MailData(String senderID, String receiverID, int userID, ArrayList<Mail> mails) {
		super(senderID, receiverID, MessageType.COMM_DATA);
		this.userID = userID;
		this.mails = mails;
	}

	public ArrayList<Mail> getMails() {
		return mails;
	}

	public void setMails(ArrayList<Mail> mails) {
		this.mails = mails;
	}

	public class Mail {

		private String subject;
		private String content;
		private String type;
		private String from;
		private Date received;

		public Mail(String subject, String content, String type, String from, Date received) {
			setSubject(subject);
			setContent(content);
			setType(type);
			setFrom(from);
			setReceived(received);
		}

		public String getSubject() {
			return subject;
		}

		public void setSubject(String subject) {
			this.subject = subject;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public String getFrom() {
			return from;
		}

		public void setFrom(String from) {
			this.from = from;
		}

		public Date getReceived() {
			return received;
		}

		public void setReceived(Date received) {
			this.received = received;
		}

		@Override
		public String toString() {
			return "Subject: " + subject + " \n"
					+ "---------------------------------\n" + "MsgType: "
					+ type + "\n" + "Content: " + content + "\n"
					+ "---------------------------------\n" + "Msg from: "
					+ from + "\n" + "Received: " + received.toString() + "\n";
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}
	}

}