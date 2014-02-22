package ontology.messages;

import ontology.Message;
import ontology.MessageType;
import ontology.messages.MailData.Mail;

public class SendMail extends Message{

   int userID;
   String receiver;
   Mail mail;

   public SendMail(String senderID, String receiverID, int userID, Mail mail, String receiver) {
       super(senderID, receiverID, MessageType.SAVE_COMM);
       this.userID = userID;
       this.mail = mail;
       this.receiver = receiver;
   }

   public int getUserID() {
       return userID;
   }

   public Mail getMail() {
       return mail;
   }
   
   public void setMail(Mail mail) {
       this.mail = mail;
   }
  
   public String getReceiver() {
       return receiver;
   }
}