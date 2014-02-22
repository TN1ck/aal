package ontology.messages;

import de.dailab.jiactng.agentcore.knowledge.IFact;

import ontology.Message;
import ontology.MessageType;

public class Gesture extends Message {
	private static final long serialVersionUID = 2134345673245L;

    String gesture;
    int niteID;

    public Gesture(String senderID, String receiverID, String gesture, int niteID){
        super(senderID, receiverID, MessageType.GESTURE);
    	this.gesture = gesture;
    	this.niteID = niteID;
    }

    public void setGesture(String gesture) {
    	this.gesture = gesture;
    }

    public String getGesture() {
    	return gesture;
    }
    
    public int getNiteID() {
    	return niteID;
    }
}