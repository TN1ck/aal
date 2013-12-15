package util;

import java.awt.AWTException;
import java.awt.Dimension;
import java.awt.Robot;
import java.awt.Toolkit;

public class CursorPosition {
	private int x;
	private int y;
	
	public CursorPosition(int x, int y) {
		this.x = x;
		this.y = y;
	}

	public static CursorPosition getRandomPosition(int boundX, int boundY) {
		int randX = 0 + (int)(Math.random() * ((boundX - 0) + 1));
		int randY = 0 + (int)(Math.random() * ((boundY - 0) + 1));
		return new CursorPosition(randX, randY);
	}
	
	public static CursorPosition getRandomPosition() {
		return getRandomPosition(CursorPosition.getDimensionsOfDisplay().width, CursorPosition.getDimensionsOfDisplay().height);
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}
	
	public String toJSON() {
		return String.format("{\"x\": %d, \"y\":%d}", x, y);
	}
	
	public static Dimension getDimensionsOfDisplay() {
		return Toolkit.getDefaultToolkit().getScreenSize();
	}
	
	public void moveCursor() {
		try {
		    Robot robot = new Robot();
		    robot.mouseMove(x, y);
		} catch (AWTException e) {
			e.printStackTrace();
		}
	}
}
