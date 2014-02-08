package jiac.pingpong;

import de.dailab.jiactng.agentcore.knowledge.IFact;

public class Ping implements IFact {
	
	private static final long serialVersionUID = 3374059561747194801L;
	
	private String message;
	
	public Ping(String payload) {
		this.message= payload;
	}

	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
}
