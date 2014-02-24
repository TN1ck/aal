package ontology.messages;

import ontology.Message;
import ontology.MessageType;

public class SaveGmailData extends Message {

	int userID;
	String user;
	String password;
	
	public SaveGmailData(String senderID, String receiverID, int userID, String user, String password) {
		super(senderID,receiverID,MessageType.SAVE_COMM);
		this.userID = userID;
		this.user = user;
		this.password = password;
	}
	
	public int getUserID() {
		return userID;
	}
	
	public void setUserID(int userID) {
		this.userID = userID;
	}
	
	public String getUser() {
		return user;
	}
	
	public void setUser(String user) {
		this.user = user;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
}
