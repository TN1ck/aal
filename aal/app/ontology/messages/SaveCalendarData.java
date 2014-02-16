package ontology.messages;

import ontology.Message;
import ontology.MessageType;
import jiac.CalendarEntry;

public class SaveCalendarData extends Message {

    int userID;
    CalendarEntry entry;

    public SaveCalendarData(String senderID, String receiverID, int userID, CalendarEntry entry) {
    	super(senderID, receiverID, MessageType.SAVE_INFO);
    	this.entry = entry;
    	this.userID = userID;
    }

    public int getUserID() {
        return userID;
    }
    
    public CalendarEntry getEntry() {
        return entry;
    }
}