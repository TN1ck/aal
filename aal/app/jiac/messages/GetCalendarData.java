package jiac.messages;

import jiac.Message;
import jiac.MessageType;

public class GetCalendarData extends Message{

    int userID;

    public GetCalendarData(String senderID, String receiverID, int userID){
    	super(senderID, receiverID, MessageType.GET_INFO);
    	this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }
}