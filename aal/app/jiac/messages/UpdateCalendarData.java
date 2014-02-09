package jiac.messages;

import jiac.Message;
import jiac.MessageType;
import jiac.CalendarEntry;

public class UpdateCalendarData extends Message {
	
    int userID;
    CalendarEntry entry;

    public UpdateCalendarData(String senderID, String receiverID, int userID, CalendarEntry entry) {
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
