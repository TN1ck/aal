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

}
