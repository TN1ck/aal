package ontology.messages;

import jiac.Message;
import jiac.MessageType;

public class GetNewsData extends Message{

    public GetNewsData(String senderID, String receiverID){
        super(senderID, receiverID, MessageType.GET_INFO);
    }
}