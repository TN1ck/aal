package ontology.messages;


import de.dailab.jiactng.agentcore.knowledge.IFact;
import ontology.Message;
import ontology.MessageType;
import ontology.TransportFrame;

public class RecognizeUser extends Message {
	private static final long serialVersionUID = 2134345673245L;

    int niteID;
    boolean qr;

    public RecognizeUser(String senderID, String receiverID, int niteID, boolean qr) {
        super(senderID, receiverID, MessageType.RECOGNIZE_USER);
    	this.niteID = niteID;
    	this.qr = qr;
    }
    
    public int getNiteID() {
    	return niteID;
    }
    
    public boolean getQr() {
    	return qr;
    }
}