package jiac.beans;


import jiac.Message;
import de.dailab.jiactng.agentcore.action.AbstractMethodExposingBean;
import de.dailab.jiactng.agentcore.action.Action;
import de.dailab.jiactng.agentcore.comm.IGroupAddress;
import de.dailab.jiactng.agentcore.comm.message.JiacMessage;
import de.dailab.jiactng.agentcore.knowledge.IFact;
import org.sercho.masp.space.event.SpaceEvent;
import org.sercho.masp.space.event.SpaceObserver;
import org.sercho.masp.space.event.WriteCallEvent;
import static de.dailab.jiactng.agentcore.comm.ICommunicationBean.ACTION_SEND;
import static de.dailab.jiactng.agentcore.comm.ICommunicationBean.ACTION_JOIN_GROUP;

import java.io.Serializable;



public abstract class AbstractCommunicatingBean extends AbstractMethodExposingBean {
    /*
     * This is a template for memory matching
     */
    private final static JiacMessage MESSAGE_TEMPLATE = new JiacMessage(new Message());

    /*
      * This is an observer for the memory to immediately receive messages that are received.
      */
    private final SpaceObserver<IFact> observer = new MessageObserver();

    protected Action sendAction;
    protected Action join;

    /**
     * The message observer received a message and forwarded it to the method for processing.
     *
     * @param message The message to be processed.
     */
    protected abstract void receiveMessage(Message message);

    /**
     * Send a message to the given agent group
     *
     * @param message The message to be send
     * @param target  The group that shall receive the message
     */
    protected void sendMessage(Message message, IGroupAddress target) {
        JiacMessage transport = new JiacMessage(message);
        invoke(sendAction, new Serializable[]{transport, target});
    }

    protected String getAgentId() {
        return thisAgent.getAgentId();
    }

    @Override
    public void doStart() throws Exception {
        log.info("AbstractCommunicationBean started.");
        super.doStart();
        join = retrieveAction(ACTION_JOIN_GROUP);
        sendAction = retrieveAction(ACTION_SEND);
        if(sendAction==null){
            log.info("sendAction is null!!!");
        }
        log.info("sendAction is " + sendAction);
        memory.attach(observer, MESSAGE_TEMPLATE);
    }

    @Override
    public void doStop() throws Exception {
        super.doStop();
        log.info("stopping " + thisAgent.getAgentId());
    }

    /*
    * This space observer notifies us whenever the broker receives messages via his agent memory.
    */
    final class MessageObserver implements SpaceObserver<IFact> {
        static final long serialVersionUID = -1143799774862165996L;

        /*
        * This method will be called, if an event belongs to an object in the
        * agents memory, according to the given template.
        */
        @SuppressWarnings("unchecked")
        @Override
        public void notify(SpaceEvent<? extends IFact> event) {
            log.info("received a message");
            if (event instanceof WriteCallEvent) {
                Object object = ((WriteCallEvent) event).getObject();
                if (object instanceof JiacMessage) {

                    IFact msg = ((JiacMessage) object).getPayload();
                    if (msg instanceof Message) {
                        //check whether this message was actually sent by us, otherwise
                        //we would receive our own messages
                        if (!((Message) msg).getSenderID().equals(AbstractCommunicatingBean.this.thisAgent.getAgentId())) {
                            if ((((Message) msg).getReceiverID() == null) || (((Message) msg).getReceiverID().equals(AbstractCommunicatingBean.this.thisAgent.getAgentId()))) {
                                AbstractCommunicatingBean.this.receiveMessage((Message) msg);
                            }
                        }
                    } else {
                        log.error("Unknown message of type " + msg.getClass() + " received");
                    }
                }
            }
        }
    }
}
