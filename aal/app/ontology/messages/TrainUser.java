package ontology.messages;


import de.dailab.jiactng.agentcore.knowledge.IFact;
import ontology.Message;
import ontology.MessageType;
import ontology.TransportFrame;

public class TrainUser extends Message {
	private static final long serialVersionUID = 2134345673245L;

    int niteID;

    public TrainUser(String senderID, String receiverID, int niteID) {
        super(senderID, receiverID, MessageType.TRAIN_USER);
    	this.niteID = niteID;
    }
    
    public int getNitID() {
    	return niteID;
    }

}