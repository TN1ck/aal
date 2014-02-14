/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ontology.messages;

import jiac.Message;
import jiac.MessageType;

/**
 *
 * @author Administrator
 */
public class TestMessage extends Message{

    int userID;

    public TestMessage(String senderID, String receiverID, int userID){
        super(senderID, receiverID, MessageType.TEST_MESSAGE);
    }

    public int getUserID() {
        return userID;
    }
}