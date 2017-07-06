/**
 * Asks the user to enter an integer,
 * making sure to catch exceptions
 * for non-integer inputs and to re-query
 * the user if any are caught, then coerces
 * the string input to an integer and performs
 * various attribute tests on it, setting
 * bit-fields for each test. The flags are then
 * bitwise ANDed with each mask to build and
 * display an output string which describes
 * the integer.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 17
 * 06/17/17
 */

// for GUI Dialogue Windows
import javax.swing.*;

public class PabalinasJoey17 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {

		// loop query until correct input is given
		for (;;) {
			// initialize a bit-field variable to hold input integer attributes
			int flags = 0x0;
			// query the user for an integer
			String stringInput = JOptionPane.showInputDialog("Please enter an integer: ");

			// try block for user integer input
			try {
				// throw exception if a non-integer/sign character is matched
				if (stringInput.matches("[^-0-9]")) {
					throw new NumberFormatException();
				}
				// coerce the string to an int
				int inputInt = Integer.parseInt(stringInput);

				/*
				 * 0x1 set - integer equals 0
				 * 0x1 unset - integer does not equal 0
				 */
				if (inputInt == 0) {
					flags |= 0x1;
				}

				/*
				 * 0x2 set - integer is negative
				 * 0x2 unset - integer is positive
				 */
				if (inputInt < 0) {
					flags |= 0x1 << 1;
				}

				/*
				 * 0x4 set - integer is even
				 * 0x4 unset - integer is odd
				 */
				if ((inputInt & 0x1) == 0) {
					flags |= 0x1 << 2;
				}

				/*
				 * 0x8 set - integer is a multiple of 2, 3, or 5
				 * 0x8 unset - integer is not a multiple of 2, 3, or 5
				 */
				if (((inputInt % 2) & (inputInt % 3) & (inputInt % 5)) == 0) {
					flags |= 0x1 << 3;
				}

				/*
				 * 0x10 set - integer is a multiple of 2, 3, and 5
				 * 0x10 unset - integer is not a multiple of 2, 3, and 5
				 */
				if (((inputInt % 2) | (inputInt % 3) | (inputInt % 5)) == 0) {
					flags |= 0x1 << 4;
				}

				// print out the test results
				JOptionPane.showMessageDialog(null,
						"The integer you entered was: " +
						// display the integer the user entered
						inputInt +
						".\nYour integer is " +
						// 0x1 mask - zero test
						(((flags & 0x1) == 0) ? "not " : "") +
						"equal to zero.\nYour integer is " +
						// 0x2 mask - sign test
						(((flags & 0x1) != 0) ?
							"neither positive nor negative" :
							(((flags & (0x1 << 1)) == 0) ?
								"positive" :
								"negative")) +
						".\nYour integer is " +
						// 0x4 mask - odd/even test
						(((flags & (0x1 << 2)) == 0) ? "odd" : "even") +
						".\nYour integer is " +
						// 0x8 mask - 2, 3, or 5 multiple test
						(((flags & (0x1 << 3)) == 0) ? "not " : "") +
						"a multiple of 2, 3, or 5.\nYour integer is " +
						// 0x10 mask - 2, 3, and 5 multiple test
						(((flags & (0x1 << 4)) == 0) ? "not " : "") +
						"a multiple of 2, 3, and 5.");
				// break out of loop on correct input
				break;

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
