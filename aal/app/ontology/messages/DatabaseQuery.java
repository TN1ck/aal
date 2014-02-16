package ontology.messages;

import de.dailab.jiactng.agentcore.knowledge.IFact;

import ontology.Message;
import ontology.MessageType;

public class DatabaseQuery extends Message {

    String query;

    public DatabaseQuery(String senderId, String receiverId, String query){
        super(senderId, receiverId, MessageType.GET_TODOS);
        this.query = query;
    }

    public void setQuery(String query) {
    	this.query = query;
    }

    public String getQuery() {
    	return query;
    }
}