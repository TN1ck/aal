package util;

import models.CalendarItem;
import models.NewsItem;
import models.TodoItem;

import com.avaje.ebean.Ebean;

public class MiscUtils {

	public static void emptyDb() {
		Ebean.delete(NewsItem.find.all());
		Ebean.delete(TodoItem.find.all());
		Ebean.delete(CalendarItem.find.all());
	}

}
