package jiac.messages;

import jiac.Message;
import jiac.MessageType;

public class GetFacebookData extends Message{

    int userID;

    public GetFacebookData(String senderID, String receiverID, int userID){
        super(senderID, receiverID, MessageType.GET_SOCIAL);
        this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }
}