/**
 * This program queries the user
 * for a double and then uses
 * that value to calculate volumes
 * for a cube, a regular tetrahedron,
 * and a sphere.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 8
 * 05/29/17
 *
 */

// For GUI Dialogue Windows.
import javax.swing.*;
import java.util.*;

public class PabalinasJoey8 {
	/**
	 * Method "main()" is used to atart an application.
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
				// instantiatie a hash map to store the results
				HashMap<String, Double> volumeMap = new HashMap<>();
				// calculate shape volumes and store them in a hash map
				volumeMap.put("cube",
					(inputEdge * inputEdge * inputEdge));
				volumeMap.put("tetrahedron",
					(Math.pow(inputEdge, 3.d) / (6.d * Math.sqrt(2.d))));
				volumeMap.put("sphere",
					((4.d / 3.d) * Math.PI * Math.pow((inputEdge / 2), 3)));
				// print out the calculated volumes
				JOptionPane.showMessageDialog(null,
					"Cube volume: " +
						volumeMap.get("cube") +
						"\n" +
						"Regular tetrahedron volume: " +
						volumeMap.get("tetrahedron") +
						"\n" +
						"Sphere volume: " +
						volumeMap.get("sphere"));
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
