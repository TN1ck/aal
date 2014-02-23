package models;

import ontology.TransportFrame;

public class User {
	
	public int niteID;
	public int userID;
	public TransportFrame image;
	public boolean allowed = false;
	
	public User (int niteID) {
		this.niteID = niteID;
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
	
	public TransportFrame getImage() {
		return this.image;
	}

}
