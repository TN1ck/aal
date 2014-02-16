package models;

import java.util.*;
import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

@Entity 
public class MailItem extends Model {

  @Id
  @Constraints.Min(10)
  public Long id;
  
  @Column(columnDefinition = "TEXT")
  @Constraints.Required
  public String text;
  
  @Constraints.Required
  public String subject;
  
  @Constraints.Required
  @Formats.DateTime(pattern="dd/MM/yyyy")
  public Date received = new Date();
  
  public MailItem(String subject, String text, Date received) {
	  this.subject = subject;
	  this.text = text;
	  this.received = received;
  }
  
  public static Finder<Long,MailItem> find = new Finder<Long,MailItem>(
    Long.class, MailItem.class
  ); 

}
