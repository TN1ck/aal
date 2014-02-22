package ontology.messages;


import de.dailab.jiactng.agentcore.knowledge.IFact;
import ontology.Message;
import ontology.MessageType;
import ontology.TransportFrame;

public class StartTraining extends Message {
	private static final long serialVersionUID = 2134345673245L;

    int niteID;

    public StartTraining(String senderID, String receiverID, int niteID) {
        super(senderID, receiverID, MessageType.INITIALIZE_TRAINING);
    	this.niteID = niteID;
    }
    
    public int getNiteID() {
    	return niteID;
    }
}