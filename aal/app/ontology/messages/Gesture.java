package ontology.messages;

import de.dailab.jiactng.agentcore.knowledge.IFact;

import ontology.Message;
import ontology.MessageType;

public class Gesture extends Message {
	private static final long serialVersionUID = 2134345673245L;

    String gesture;

    public Gesture(String senderID, String receiverID, String gesture){
        super(senderID, receiverID, MessageType.GESTURE);
    	this.gesture = gesture;
    }

    public void setGesture(String gesture) {
    	this.gesture = gesture;
    }

    public String getGesture() {
    	return gesture;
    }
}