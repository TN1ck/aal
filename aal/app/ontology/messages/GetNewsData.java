package ontology.messages;

import ontology.Message;
import ontology.MessageType;

public class GetNewsData extends Message{

    public GetNewsData(String senderID, String receiverID){
        super(senderID, receiverID, MessageType.GET_INFO);
    }
}