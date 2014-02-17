package ontology.messages;

import ontology.Message;
import ontology.MessageType;

public class DeleteTodo extends Message{

   int userID;
   int todoID;

   public DeleteTodo(String senderID, String receiverID, int userID, int todoID){
   	super(senderID, receiverID, MessageType.DELETE_INFO);
   	this.userID = userID;
   	this.todoID = todoID;
   }

   public int getUserID() {
       return userID;
   }

   public int getTodoID() {
   	return todoID;
   }
}