package models;

import java.util.*;

import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

@Deprecated
@Entity 
public class SocialItem extends Model {

  @Id
  @Constraints.Min(10)
  public Long id;
  
  @Constraints.Required
  public String text;
  
  @Constraints.Required
  public String type;
  
  @Constraints.Required
  public String url;
  
  @Constraints.Required
  public String picture;
  
  @Constraints.Required
  public String name;
  
  @Constraints.Required
  @Formats.DateTime(pattern="dd/MM/yyyy")
  public Date created = new Date();
  
  public SocialItem(String text, String type, String url, String picture, String name, Date created) {
	  this.text = text;
	  this.type = type;
	  this.url = url;
	  this.picture = picture;
	  this.name = name;
	  this.created = created;
  }
  
  public static Finder<Long,SocialItem> find = new Finder<Long,SocialItem>(
    Long.class, SocialItem.class
  ); 

}
