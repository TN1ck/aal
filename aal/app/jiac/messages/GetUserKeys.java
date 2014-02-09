package jiac.messages;

import jiac.Message;
import jiac.MessageType;

public class GetUserKeys extends Message {
	
    int userID;

    public GetUserKeys(String senderID, String receiverID, int userID) {
    	super(senderID, receiverID, MessageType.GET_INFO);
    	this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }

}
