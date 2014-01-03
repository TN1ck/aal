package models;

import java.util.*;

import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

@Entity 
public class CalendarItem extends Model {

  @Id
  @Constraints.Min(10)
  public Long id;
  
  @Column(columnDefinition = "TEXT")
  @Constraints.Required
  public String text;
  
  @Column(columnDefinition = "TEXT")
  public String location;
  
  @Constraints.Required
  public String priority;
  
  @Constraints.Required
  @Formats.DateTime(pattern="dd/MM/yyyy")
  public Date startDate = new Date();
  
  @Constraints.Required
  @Formats.DateTime(pattern="dd/MM/yyyy")
  public Date endDate = new Date();
  
  public CalendarItem(String text, String location, String priority, Date startDate, Date endDate) {
	  this.text = text;
	  this.location = location;
	  this.priority = priority;
	  this.startDate = startDate;
	  this.endDate = endDate;
  }
  
  public static Finder<Long,CalendarItem> find = new Finder<Long,CalendarItem>(
    Long.class, CalendarItem.class
  ); 

}
