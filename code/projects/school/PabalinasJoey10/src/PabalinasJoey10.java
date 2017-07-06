/**
 * Asks the user to enter the side,
 * and calculates the volume of three shapes:
 * a sphere, a regular tetrahedron, and a cube,
 * once using an all() method that returns a HashMap,
 * and once using static methods defined
 * in the file Volume.java.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 10
 * 06/05/17
 */

// for GUI Dialogue Windows
import javax.swing.*;

public class PabalinasJoey10 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {

		// loop query until correct input is given
		for (;;) {
			// query user for a double
			String stringInput = JOptionPane.showInputDialog("Please enter a double: ");

			// try block for user double input
			try {
				// coerce the string to a double
				Double inputEdge = Double.parseDouble(stringInput);
				// print out the calculated volumes
				JOptionPane.showMessageDialog(null,
					"Cube volume: " +
					Volume.all(inputEdge).get("cube") +
					"\nRegular tetrahedron volume: " +
					Volume.all(inputEdge).get("tetrahedron") +
					"\nSphere volume: " +
					Volume.all(inputEdge).get("sphere") +
					"\n\nCube volume (static method): " +
					Volume.cube(inputEdge) +
					"\nRegular tetrahedron volume (static method): " +
					Volume.tetrahedron(inputEdge) +
					"\nSphere volume (static method): " +
					Volume.sphere(inputEdge));
				// break out of loop on correct input
				break;

			// catch block for no input
			} catch (NullPointerException nullError) {
				JOptionPane.showMessageDialog(null,
					"ERROR: Please enter a double instead of clicking" +
					"\"Cancel\" - INPUT: " +
					nullError.getLocalizedMessage());
				// don't repeat loop for null exception
				break;

				// catch block for non-double input
			} catch (NumberFormatException numberError) {
				JOptionPane.showMessageDialog(null,
					"ERROR: Input was not a double (decimal number) - " +
					numberError.getLocalizedMessage());

				// catch block for arithmetic exceptions
			} catch (ArithmeticException arithmeticError) {
				JOptionPane.showMessageDialog(null,
					"ERROR: Arithmetic exception occured - " +
					arithmeticError.getLocalizedMessage());
			}
		}
	}
}
