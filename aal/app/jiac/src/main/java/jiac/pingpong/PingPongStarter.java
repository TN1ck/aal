package jiac.pingpong;
import jiac.NodeStarter;

public class PingPongStarter {

	public static void start() {
		NodeStarter.startNode("classpath*:ping_pong.xml", "PingPongNode", 5000);
	}
}
