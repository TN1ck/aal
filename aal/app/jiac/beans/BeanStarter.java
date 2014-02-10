package jiac.beans;
//import jiac.NodeStarter;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import de.dailab.jiactng.agentcore.SimpleAgentNode;

public class BeanStarter {

	public static void start() {
		//NodeStarter.startNode("jiac.xml", "ApplicationNode", 0);
		SimpleAgentNode node = (SimpleAgentNode) new ClassPathXmlApplicationContext("jiac.xml").getBean("ApplicationNode");
	}
}
