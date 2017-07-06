/**
 * Asks the user to enter two integers,
 * then performs integer division and
 * modulus operations with the two integers
 * as input and asks the user if they would
 * like to enter two new integers and repeat
 * these calculations; any possible exceptions
 * are caught and handled gracefully.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 19
 * 06/17/17
 */

// for GUI Dialogue Windows
import javax.swing.*;

public class PabalinasJoey19 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {

		// loop query until user want to end the program
		while (true) {
			// query the user for two integers
			String strInput[] = {
				JOptionPane.showInputDialog("Please enter the first integer:"),
				JOptionPane.showInputDialog("Please enter the second integer:"),
			};

			// try block for user integer input
			try {
				// throw exception if a non-integer/sign character is matched
				if (strInput[0].matches("[^-0-9]") || strInput[1].matches("[^-0-9]")) {
					throw new NumberFormatException();
				}
				// coerce the strings to an int
				int inputInts[] = {
					Integer.parseInt(strInput[0]),
					Integer.parseInt(strInput[1]),
				};

				// display calculation results
				JOptionPane.showMessageDialog(null,
					"Integer division results: " +
					inputInts[0] + " / " + inputInts[1] + " = " +
					(inputInts[0] / inputInts[1]) + "\n" +
					"Integer modulus results: " +
					inputInts[0] + " % " + inputInts[1] + " = " +
					(inputInts[0] % inputInts[1]));

				// ask user whether to repeat the loop
				if (!JOptionPane.showInputDialog("Would you like to perform a new calculation? [y/N]").matches("[Yy]")) {
					break;
				}

			// catch block for no input
			} catch (NullPointerException nullError) {
				JOptionPane.showMessageDialog(null,
					"ERROR: Please enter an integer instead of clicking" +
					"\"Cancel\" - INPUT: " +
					nullError.getLocalizedMessage());
				// don't repeat loop for null exception
				break;

			// catch block for non-integer input
			} catch (NumberFormatException numberError) {
				JOptionPane.showMessageDialog(null,
					"ERROR: Input was not an integer - " +
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
