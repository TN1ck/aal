package ontology.messages;

import ontology.Message;
import ontology.MessageType;
import ontology.messages.TodoData.TodoItem;

public class SaveTodo extends Message{

   int userID;
   TodoItem todo;

   public SaveTodo(String senderID, String receiverID, int userID, TodoItem todo){
   	super(senderID, receiverID, MessageType.DELETE_INFO);
   	this.userID = userID;
   	this.todo = todo;
   }

   public int getUserID() {
       return userID;
   }

   public TodoItem getTodo() {
   	return todo;
   }
}