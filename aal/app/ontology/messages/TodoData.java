package ontology.messages;

import jiac.Message;
import jiac.MessageType;
import play.libs.Json;
import play.libs.F.Promise;
import com.fasterxml.jackson.databind.JsonNode;


public class TodoData extends Message{

    int userID;
    JsonNode data;

    public TodoData(String senderID, String receiverID, int userID, JsonNode data){
        super(senderID, receiverID, MessageType.GET_SOCIAL);
        this.userID = userID;
        this.data = data;
    }

    public int getUserID() {
        return userID;
    }

    public JsonNode getData() {
    	return data;
    }
}