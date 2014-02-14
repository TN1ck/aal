package ontology.messages;

import jiac.Message;
import jiac.MessageType;

public class GetMailData extends Message{

    int userID;

    public GetMailData(String senderID, String receiverID, int userID){
        super(senderID, receiverID, MessageType.GET_COMM);
        this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }
}