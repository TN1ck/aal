package ontology.messages;

import ontology.Message;
import ontology.MessageType;

public class GetTodoData extends Message{

    int userID;

    public GetTodoData(String senderID, String receiverID, int userID){
    	super(senderID, receiverID, MessageType.GET_INFO);
    	this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }
}