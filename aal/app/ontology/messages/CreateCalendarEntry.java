package ontology.messages;

import ontology.Message;
import ontology.MessageType;
import ontology.messages.CalendarData.Entry;

public class CreateCalendarEntry extends Message{

   int userID;
   Entry entry;

   public CreateCalendarEntry(String senderID, String receiverID, int userID, Entry entry){
   	super(senderID, receiverID, MessageType.SAVE_INFO);
   	this.userID = userID;
   	this.entry = entry;
   }

   public int getUserID() {
       return userID;
   }

   public Entry getEntry() {
   	return entry;
   }
}