package ontology.messages;

import ontology.Message;
import ontology.MessageType;
import ontology.messages.CalendarData.Entry;

public class SaveCalendarData extends Message {

	private static final long serialVersionUID = 1L;
	int userID;
    Entry entry;

    public SaveCalendarData(String senderID, String receiverID, int userID, Entry entry) {
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