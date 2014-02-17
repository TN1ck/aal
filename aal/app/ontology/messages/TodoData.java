package ontology.messages;

import java.util.ArrayList;
import java.util.Date;

import ontology.Message;
import ontology.MessageType;

public class TodoData extends Message{
	
	private static final long serialVersionUID = 3387887822322414052L;
	int userID;
    ArrayList<TodoItem> items;

    public TodoData(String senderID, String receiverID, int userID, ArrayList<TodoItem> items){
        super(senderID, receiverID, MessageType.GET_INFO);
        this.userID = userID;
        this.items = items;
    }

    public int getUserID() {
        return userID;
    }
    
    public ArrayList<TodoItem> getItems() {
    	return items;
    }
    
    public void setItems(ArrayList<TodoItem> items) {
    	this.items = items;
    }

    public class TodoItem {
    	public int id;		// falls wir eins löschen wollen
    	public String text;
    	public String prio;	// LOW,MIDDLE,HIGH
    	public Date created = new Date();
    	  
    	public TodoItem(int id, String text, String prio, Date created) {
    		this.id = id;
    		this.text = text;
    		this.prio = prio;
    		this.created = created;
    	} 
    }
}