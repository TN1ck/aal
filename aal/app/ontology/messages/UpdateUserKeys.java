package ontology.messages;

import java.util.HashMap;

import jiac.Message;
import jiac.MessageType;

public class UpdateUserKeys extends Message {
	
	int userID;
	HashMap<String, String> keys;

    public UpdateUserKeys(String senderID, String receiverID, int userID, HashMap<String, String> keys) {
    	super(senderID, receiverID, MessageType.GET_INFO);
    	this.userID = userID;
    	this.keys = keys;
    }

    public int getUserID() {
        return userID;
    }
    
    public HashMap<String, String> getKeys() {
    	return keys;
    }

}
