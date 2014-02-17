package ontology.messages;

import ontology.Message;
import ontology.MessageType;
import ontology.messages.CalendarData.Entry;

public class UpdateCalendarData extends Message {
	
    int userID;
    Entry entry;

    public UpdateCalendarData(String senderID, String receiverID, int userID, Entry entry) {
    	super(senderID, receiverID, MessageType.SAVE_INFO);
    	this.entry = entry;
    	this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }
    
    public Entry getEntry() {
        return entry;
    }
}
