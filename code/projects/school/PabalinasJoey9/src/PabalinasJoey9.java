/**
 * This program draws a panel
 * displaying five houses using
 * static methods
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 9
 * 05/31/17
 */

// used to make a frame and a panel to draw on
import javax.swing.*;
// has methods to set fonts, draw text, set colors, and draw shapes
import java.awt.*;

public class PabalinasJoey9 extends JPanel {
	/**
	 * This method displays five houses
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {
		//create a frame with a title
		JFrame window = new JFrame("Quaint Houses");

		// create and instance of the class to draw upon
		PabalinasJoey9 panel = new PabalinasJoey9();

		// add the panel to the window
		window.setContentPane(panel);

		// set exit on window close atttribute
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		// set window location
		window.setLocation(0, 100);
		// sets the size of the window: width and height
		window.setSize(2160, 500);
		// if you do not set this parameter to "true", the window will be invisible!
		window.setVisible(true);
	}

	protected void paintComponent(Graphics panel) {
		/**
		 * The paintComponent() method draws the content of the panel.
		 * It draws the 5 things
		 *
		 * @param panel is the object on which we use the drawing methods
		 */

		// call the paintComponent method from the JPanel superclass
		super.paintComponent(panel);

		// get the height and width
		int width = this.getWidth();
		int height = this.getHeight();

		// sets the color
		panel.setColor(Color.pink);
		// Draw a Rectangle That Is the Same Size As the JFrame panel.
		panel.fillRect(0,0,width,height);

		// draw five houses
		PabalinasJoey9.drawHouse(panel, 0);
		PabalinasJoey9.drawHouse(panel, 300);
		PabalinasJoey9.drawHouse(panel, 650);
		PabalinasJoey9.drawHouse(panel, 1150);
		PabalinasJoey9.drawHouse(panel, 1400);
	}

	private static void drawHouse(Graphics panel, int x) {
		/**
		 * The drawHouse() method draws a house
		 *
		 * @param panel is the object on which we use the drawing methods
		 * @param x is the x coordinate to start drawing at
		 */

		// draw a background and clouds
		panel.setColor(new Color(225, 225, 225));
		panel.fillOval(x + 15, 35, 170, 55);
		panel.fillOval(x + 20, 20, 160, 50);
		panel.fillOval(x + 350, 50, 170, 55);
		panel.fillOval(x + 355, 35, 160, 50);
		panel.setColor(new Color(225, 140, 0));
		panel.fillOval(x + 650, 035, 120, 120);

		// draw the main house
		panel.setColor(new Color(139, 69, 19));
		panel.fillRect(x + 100, 250, 400, 200);
		panel.fillRect(x + 499, 320, 200, 130);
		panel.setColor(new Color(190, 190, 190));
		panel.fillRect(x + 160, 150, 60, 90);
		panel.fillRect(x + 245, 380, 110, 70);
		panel.fillRect(x + 508, 350, 180, 100);
		panel.setColor(new Color(186, 134, 11));
		panel.fillOval(x + 282, 412, 10, 10);
		panel.fillOval(x + 307, 412, 10, 10);

		// draw large roof
		panel.setColor(new Color(190, 190, 190));
		int xRoof[] = {x + 98, x + 300, x + 501};
		int yRoof[] = {250, 130, 250};
		panel.fillPolygon(xRoof, yRoof, 3);

		// draw small roof
		panel.setColor(new Color(190, 190, 190));
		xRoof = new int[]{x + 499, x + 499, x + 700};
		yRoof = new int[]{320, 249, 320};
		panel.fillPolygon(xRoof, yRoof, 3);

		// fill in the panels
		panel.setColor(new Color(186, 134, 11));
		panel.fillOval(x + 521, 350, 68, 31);
		panel.fillOval(x + 606, 350, 68, 31);
		panel.fillRect(x + 121, 261, 78, 78);
		panel.fillRect(x + 121, 361, 78, 78);
		panel.fillRect(x + 401, 261, 78, 78);
		panel.fillRect(x + 401, 361, 78, 78);
		panel.fillOval(x + 241, 261, 118, 78);
		panel.setColor(new Color(175, 238, 238));
		panel.fillRect(x + 125, 265, 70, 70);
		panel.fillRect(x + 125, 365, 70, 70);
		panel.fillRect(x + 405, 265, 70, 70);
		panel.fillRect(x + 405, 365, 70, 70);
		panel.fillOval(x + 245, 265, 110, 70);
		panel.fillOval(x + 525, 353, 60, 25);
		panel.fillOval(x + 610, 353, 60, 25);
	}
}
