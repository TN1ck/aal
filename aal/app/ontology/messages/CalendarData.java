package ontology.messages;

import java.util.ArrayList;
import java.util.Date;

import ontology.Message;
import ontology.MessageType;

//import objects.Entry;

public class CalendarData extends Message {

	private static final long serialVersionUID = 1110543766223665082L;
	int userID;
	ArrayList<Entry> entries;

	public CalendarData(String senderID, String receiverID, int userID, ArrayList<Entry> entries) {
		super(senderID, receiverID, MessageType.INFO_DATA);
		this.userID = userID;
		this.entries = entries;
	}

	public void setEntries(ArrayList<Entry> entries) {
		this.entries = entries;
	}

	public ArrayList<Entry> getEntries() {
		return this.entries;
	}

	public class Entry {

		private String description;
		private String name;
		private Date startTime;
		private Date endTime;
		private String location;
		
		public Entry(String description, String name, Date startTime, Date endTime, String location){
			this.setDescription(description);
			this.setName(name);
			this.setStartTime(startTime);
			this.setEndTime(endTime);
			this.setLocation(location);
			}
		
		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Date getStartTime() {
			return startTime;
		}

		public void setStartTime(Date startTime) {
			this.startTime = startTime;
		}

		public Date getEndTime() {
			return endTime;
		}

		public void setEndTime(Date endTime) {
			this.endTime = endTime;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		@Override
		public String toString() {
			String returnString = "";
			returnString += "Title: " + name + ", Discription: " + description
					+ "\n" + "Start: ";
			if (startTime != null) {
				returnString += startTime.toString() + "; End: "
						+ endTime.toString() + " \n";
			}
			returnString += "Location: " + location + "\n";
			return returnString;
		}
	}

}