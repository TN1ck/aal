package ontology.messages;

import ontology.Message;
import ontology.MessageType;

public class RestartTraining extends Message{

   int ID;

   public RestartTraining(String senderID, String receiverID, int ID){
   	super(senderID, receiverID, MessageType.INITIALIZE_TRAINING);
   	this.ID = ID;
   }

   public int getID() {
       return ID;
   }

   public void setID(int ID) {
	   this.ID = ID;
   }
}