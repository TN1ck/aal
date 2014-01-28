package aal.beans;

public class HelloWorldBean extends de.dailab.jiactng.agentcore.AbstractAgentBean {

	@Override
	public void execute() {
		System.out.println("Hello World!");
		log.debug("HelloWorldBean running...");
	}
}
