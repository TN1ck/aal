package jiac.messages;

import jiac.Message;
import jiac.MessageType;

public class GetUserPic extends Message {
	
	int userID;

    public GetUserPic(String senderID, String receiverID, int userID) {
    	super(senderID, receiverID, MessageType.GET_INFO);
    	this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }

}
