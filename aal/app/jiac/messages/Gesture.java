package jiac.messages;

import de.dailab.jiactng.agentcore.knowledge.IFact;

import jiac.Message;
import jiac.MessageType;

public class Gesture implements IFact{
	private static final long serialVersionUID = 1L;

    String gesture;

    public Gesture(String gesture){
    	this.gesture = gesture;
    }

    public void setGesture(String gesture) {
    	this.gesture = gesture;
    }

    public String getGesture() {
    	return gesture;
    }
}