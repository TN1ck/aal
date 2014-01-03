package models;

import java.util.*;
import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

@Entity 
public class NewsItem extends Model {

  @Id
  @Constraints.Min(10)
  public Long id;
  
  @Column(columnDefinition = "TEXT")
  @Constraints.Required
  public String header;
  
  @Column(columnDefinition = "TEXT")
  @Constraints.Required
  public String text;
  
  @Constraints.Required
  public String category;
  
  @Constraints.Required
  public String publisher;
  
  @Formats.DateTime(pattern="dd/MM/yyyy")
  public Date date = new Date();
  
  public NewsItem(String header, String text, String category, String publisher, Date date) {
	  this.header = header;
	  this.text = text;
	  this.category = category;
	  this.publisher = publisher;
	  this.date = date;
  }
  
  public static Finder<Long,NewsItem> find = new Finder<Long,NewsItem>(
    Long.class, NewsItem.class
  ); 

}
