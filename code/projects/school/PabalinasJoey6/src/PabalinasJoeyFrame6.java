 /**
  * This program sets up a basic
  * frame that is a basis of our
  * GUI program
  *
  *
  * @author Pabalinas, Joey
  * ICS 111 Assignment 6
  * 05/23/17
  */

// used to make a frame, which is a window with a title and a border
import javax.swing.JFrame;

public class PabalinasJoeyFrame6 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {
		// constants for coordinated and height/width
		final int WINDOW_COORDINATE_X = 250;
		final int WINDOW_COORDINATE_Y = 250;
		final int WINDOW_WIDTH = 800;
		final int WINDOW_HEIGHT = 600;
		// create a frame and add a title
		JFrame window = new JFrame("I am so bad at GUI programming, wow");
		/*
		 * Create a panel to draw the text upon
		 * SnowPersonPanel is a class, which is defined below this class, in the same file
		 */
		PabalinasJoeyPanel6 panel = new PabalinasJoeyPanel6();
		// add the panel to the window
		window.setContentPane(panel);
		/*
		 * The default is to hide the JFrame when the user closes the window.
		 * However, we want the window to stop running, when we close the window!
		 */
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		// set windows location with previously defined constants
		window.setLocation(WINDOW_COORDINATE_X, WINDOW_COORDINATE_Y);
		// sets the size of the window: width and height
		window.setSize(WINDOW_WIDTH,WINDOW_HEIGHT);
		// if you do not set this parameter to "true", the window will be invisible!
		window.setVisible(true);
	}
}
