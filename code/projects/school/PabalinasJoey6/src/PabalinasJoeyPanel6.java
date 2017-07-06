/**
 * This program is the panel for the
 * main GUI program. It does not
 * have a main() method, instead it
 * is where most of the drawing
 * will be handled through the
 * paintComponent() method.
 *
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 6
 * 05/23/17
 */

// used to make a panel, which is a place to draw text and shapes
import javax.swing.JPanel;
// has methods to set fonts, draw text, set colors, and draw shapes
import java.awt.*;

class PabalinasJoeyPanel6 extends JPanel {
	/**
	 * The paintComponent() method draws the content of the panel.
	 * It draws the Greetings In Different Languages & Colors.
	 * This overrides the method in java.swing.JComponent.
	 *
	 * @param page is the object on which we use the drawing methods
	 */
	public void paintComponent(Graphics page) {
		/*
		 * Calls the paintComponent method from the superclass JPanel.
		 * Initializes variables in superclass JPanel to default values.
		 * If not included, the setBackground() method will not work.
		 */
		super.paintComponent(page);
		// Find out the width of this component.
		int width =  getWidth();
		// Find out its height.
		int height = getHeight();

		/*
		 * "this" Is An Object That Represents The JPanel Itself.
		 * Method "setBackground()" Sets The Background Color Of The JPanel.
		 * Use Object "Color.colorName" To Set The Colors.
		 * See The Java API For A List Of Colors.
		 */
		Font font = new Font("SansSerif", Font.PLAIN, 26);
		this.setFont(font);

		/*
		 * if the universe happens to be imploding,
		 * we should throw an exception (i haven't
		 * quite figured out how to yet…)
		 */
		if (width + height <= 0) {
			this.setBackground(Color.darkGray);
			this.setForeground(Color.red);
			page.drawString("oh god we are all gonna die Ｄ：", 100, 150);
		} else {
			// seems we are safe for now…
			this.setBackground(Color.darkGray);
			this.setForeground(Color.lightGray);

			// instantiate a Graphics2D object by type-casting the page object
			Graphics2D pageTwo = (Graphics2D)page;
			// turn on anti-aliasing and draw thicker lines
			pageTwo.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
				RenderingHints.VALUE_ANTIALIAS_ON);
			pageTwo.setStroke(new BasicStroke(2));

			// display some text to the user
			page.drawString("I am not much of an artist sorry ☹", 100, 150);
			page.drawString("♫☆ヾ(*´Д｀*)ﾉ☆♪♩", 150, 200);
			page.drawString("This is the best i could do ；＿；", 250, 250);
			page.drawString("♫☆ヾ(*´Д｀*)ﾉ☆♪♩", 300, 400);

			// draw a weird amalgam of duck-esque shapes
			page.draw3DRect(100, 300, 100, 100, true);
			// i hope this counts as a line
			page.drawArc(400, 300, 200, 200, 20, 75);
			// draw a beak
			page.drawOval(350, 275, 100, 50);
			// draw the eyes, head, and body
			page.drawRoundRect(300, 275, 75, 75, 50, 50);
			page.drawRoundRect(335, 290, 20, 20, 50, 50);
			page.drawRoundRect(200, 300, 100, 50, 50, 50);
		}
	}
}
