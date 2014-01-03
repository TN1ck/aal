package models;

import java.util.*;
import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

@Entity 
public class TodoItem extends Model {

  @Id
  @Constraints.Min(10)
  public Long id;
  
  @Column(columnDefinition = "TEXT")
  @Constraints.Required
  public String text;
  
  @Constraints.Required
  public String type;
  
  @Constraints.Required
  @Formats.DateTime(pattern="dd/MM/yyyy")
  public Date created = new Date();
  
  public TodoItem(String text, String type, Date created) {
	  this.text = text;
	  this.type = type;
	  this.created = created;
  }
  
  public static Finder<Long,TodoItem> find = new Finder<Long,TodoItem>(
    Long.class, TodoItem.class
  ); 

}
