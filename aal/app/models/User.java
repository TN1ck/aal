package models;

public class User {
	
	public int niteID;
	public int userID;
	public String image;
	public boolean allowed = true;
	
	public User (int niteID) {
		this.niteID = niteID;
		this.userID = -2;
	}
	
	public int getNiteID() {
		return this.niteID;
	}
	
	public int getUserID() {
		return this.userID;
	}
	
	public boolean getAllowed() {
		return this.allowed;
	}
	public void setAllowed(boolean b) {
		this.allowed = b;
		
	}

	public void setImage(String string) {
		this.image = string;
		
	}

}
