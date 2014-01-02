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
  
  @Constraints.Required
  public String header;
  
  @Constraints.Required
  public String text;
  
  @Constraints.Required
  public String category;
  
  @Constraints.Required
  public String publisher;
  
  @Constraints.Required
  @Formats.DateTime(pattern="dd/MM/yyyy")
  public Date dueDate = new Date();
  
  public static Finder<Long,NewsItem> find = new Finder<Long,NewsItem>(
    Long.class, NewsItem.class
  ); 

}
