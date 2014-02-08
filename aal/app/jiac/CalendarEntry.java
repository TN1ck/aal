package jiac;

import java.util.Date;

public class CalendarEntry {

	int id;
	String description;
	Date start;
	Date end;
	String place;

	public CalendarEntry(int id,String description, Date start, Date end, String place) {
		this.id = id;
		this.description = description;
		this.start = start;
		this.end = end;
		this.place = place;
	}




}