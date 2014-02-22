package ontology.messages;


import de.dailab.jiactng.agentcore.knowledge.IFact;
import ontology.Message;
import ontology.MessageType;
import ontology.TransportFrame;

public class UserState extends Message {
	private static final long serialVersionUID = 2134345673245L;

    int niteID;
    int userID;
    TransportFrame image;

    public UserState(String senderID, String receiverID, int niteID, int userID, TransportFrame image) {
        super(senderID, receiverID, MessageType.GESTURE);
    	this.niteID = niteID;
    	this.userID = userID;
    	this.image = image;
    }
    
    public int getNitID() {
    	return niteID;
    }
    
    public int getUserID() {
    	return userID;
    }
    
    public TransportFrame getImage() {
    	return image;
    }
}