package jiac;

public class Settings {

	boolean newsPrivate = false;
	boolean todosPrivate = true;
	boolean calendarPrivate = true;
	boolean socialPrivate = true;
	boolean infoPrivate = false;
	
	public Settings(boolean newsPrivate, boolean todosPrivate,
			boolean calendarPrivate, boolean socialPrivate, boolean infoPrivate) {
		this.newsPrivate = newsPrivate;
		this.todosPrivate = todosPrivate;
		this.calendarPrivate = calendarPrivate;
		this.socialPrivate = socialPrivate;
		this.infoPrivate = infoPrivate;
	}
	
	public Settings() {
		
	}
	
	public void setNewsPrivacy(boolean newsPrivate) {
		this.newsPrivate = newsPrivate;
	}
	
	public void setTodosPrivacy(boolean todosPrivate) {
		this.todosPrivate = todosPrivate;
	}
	
	public void setCalendarPrivacy(boolean calendarPrivate) {
		this.calendarPrivate = calendarPrivate;
	}
	
	public void setSocialPrivacy(boolean socialPrivate) {
		this.socialPrivate = socialPrivate;
	}
	
	public void setInfoPrivacy(boolean infoPrivate) {
		this.infoPrivate = infoPrivate;
	}

	public boolean isNewsPrivate() {
		return newsPrivate;
	}

	public boolean isTodosPrivate() {
		return todosPrivate;
	}

	public boolean isCalendarPrivate() {
		return calendarPrivate;
	}

	public boolean isSocialPrivate() {
		return socialPrivate;
	}

	public boolean isInfoPrivate() {
		return infoPrivate;
	}
	
	
	
}
