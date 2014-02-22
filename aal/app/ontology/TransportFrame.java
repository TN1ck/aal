/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ontology;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import javax.imageio.ImageIO;

/**
 * This is a wrapper for transportation of an bufferedImage
 * @author Administrator
 */
public class TransportFrame implements Serializable {

    transient BufferedImage frame;

    public TransportFrame(BufferedImage frame){
        this.frame=frame;
    }

    public BufferedImage getFrame(){
        return frame;
    }

    private void writeObject(ObjectOutputStream out) throws IOException{
        out.defaultWriteObject();
        ImageIO.write(frame, "png", out);
    }

    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException{
        in.defaultReadObject();
        frame=ImageIO.read(in);
    }

}
