package ontology.messages;

import de.dailab.jiactng.agentcore.knowledge.IFact;

import ontology.Message;
import ontology.MessageType;

public class UserLeft extends Message {
	private static final long serialVersionUID = 2134345673245L;

    int niteID;

    public UserLeft(String senderID, String receiverID, int niteID){
        super(senderID, receiverID, MessageType.GESTURE);
    	this.niteID = niteID;
    }
    
    public int getNitID() {
    	return niteID;
    }
}