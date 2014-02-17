package ontology.messages;

import ontology.Message;
import ontology.MessageType;
import ontology.messages.CalendarData.Entry;

public class GetEntryInformation extends Message{

   int userID;
   Entry entry;

   public GetEntryInformation(String senderID, String receiverID, int userID, Entry entry){
   	super(senderID, receiverID, MessageType.GET_INFO);
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