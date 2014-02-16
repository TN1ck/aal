package ontology.messages;

import ontology.Message;
import ontology.MessageType;

public class GetFacebookData extends Message{

    int userID;
    String accessToken;

    public GetFacebookData(String senderID, String receiverID, int userID, String accessToken){
        super(senderID, receiverID, MessageType.GET_SOCIAL);
        this.userID = userID;
        this.accessToken = accessToken;
    }

    public int getUserID() {
        return userID;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
