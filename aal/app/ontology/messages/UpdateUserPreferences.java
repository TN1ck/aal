package ontology.messages;

import ontology.Message;
import ontology.MessageType;
import jiac.Settings;

public class UpdateUserPreferences extends Message {

	int userID;
	Settings preferences;
	
	public UpdateUserPreferences(String senderID, String receiverID, int userID, Settings preferences) {
    	super(senderID, receiverID, MessageType.GET_INFO);
    	this.userID = userID;
    	this.preferences = preferences;
    }

    public int getUserID() {
        return userID;
    }
    
    public Settings getPreferences() {
    	return preferences;
    }
}
