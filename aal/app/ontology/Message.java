/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ontology;

import de.dailab.jiactng.agentcore.knowledge.IFact;

public class Message implements IFact{

    static final long serialVersionUID = -2306690619123356624L;
    private String senderID;
    private String receiverID;
    private MessageType type;

    public Message() {
        this(null, null, null);
    }

    public Message(String senderID, String ReceiverID, MessageType type) {
        this.senderID = senderID;
        this.receiverID = ReceiverID;
        this.type = type;
    }

    public String getReceiverID() {
        return receiverID;
    }

    public String getSenderID() {
        return senderID;
    }

    public MessageType getType(){
        return type;
    }

    @Override
    public String toString() {
        return "MessageTemp{" + "sender= " + senderID + " Receiver= " + receiverID +
                " MessageType=" + type + "}";
    }    
}
