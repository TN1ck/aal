package jiac.beans;
//import jiac.NodeStarter;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import de.dailab.jiactng.agentcore.SimpleAgentNode;
import de.dailab.jiactng.agentcore.lifecycle.LifecycleException;


public class BeanStarter {
	private static SimpleAgentNode node;
	
	public static void start() {
		//NodeStarter.startNode("jiac.xml", "ApplicationNode", 0);
		node = (SimpleAgentNode) new ClassPathXmlApplicationContext("jiac.xml").getBean("ApplicationNode");

		
	}

	public static void stop() {
		// stop node
		try {
			node.shutdown();
		} catch (LifecycleException e) {
			e.printStackTrace();
		}
	}
}
