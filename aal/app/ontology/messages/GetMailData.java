package ontology.messages;

import ontology.Message;
import ontology.MessageType;

public class GetMailData extends Message{

	private static final long serialVersionUID = -30942250162194310L;
	int userID;

    public GetMailData(String senderID, String receiverID, int userID){
        super(senderID, receiverID, MessageType.GET_COMM);
        this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }
}