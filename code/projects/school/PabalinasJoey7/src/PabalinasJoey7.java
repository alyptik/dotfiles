/**
 * This program queries the user for
 * two integers to calculate
 * a % b with, but throws an exception
 * and re-queries on invalid input.
 * It then queries for the user for a
 * sentence, and calculates a substring
 * of that sentence with the previous
 * integer arguments; this query is
 * repeated with an exception being
 * thrown if the indices for the
 * substring operation are out of range.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 7
 * 05/24/17
 */
import java.util.Scanner;
public class PabalinasJoey7 {
	/**
	* The main() method signifies this is
	* a program and not a library.
	*
	* @param args The commandline arguments are not used.
	*/
	public static void main(String[] args) {
		// instantiate a Scanner object
		Scanner input = new Scanner(System.in);
		// initialize the String input array
		String rawInput[] = {"", "", ""};
		// initialize the input/flag Integer array
		Integer inputIntegers[] = {0, 0, 0, 0};

		// repeat loop until proper input is given
		while (inputIntegers[2] != 1) {
			// set the flag for proper integer input
			inputIntegers[2] = 1;

			// try block for number exceptions
			try {
				// query for integer one
				System.out.print("\nEnter integer one: ");
				rawInput[0] = input.nextLine();
				inputIntegers[0] = Integer.parseInt(rawInput[0]);
				// query for integer two
				System.out.print("Enter integer two: ");
				rawInput[1] = input.nextLine();
				inputIntegers[1] = Integer.parseInt(rawInput[1]);
				// print the answer if correct input
				System.out.println(inputIntegers[0] + " % " +
					inputIntegers[1] + " = " +
					(inputIntegers[0] % inputIntegers[1]) +
					"\n");
			// catch block for number exceptions
			} catch (NumberFormatException numberException) {
				// otherwise print the cause of the exception
				System.out.println(numberException.getMessage() +
					" conversion to integer failed");
				// reset flag to 0 if exception was caught
				inputIntegers[2] = 0;
			// catch block for arithmetic exceptions
			} catch (ArithmeticException arithmeticException) {
				// otherwise print the cause of the exception
				System.out.println(arithmeticException.getMessage() +
					" attempted");
				// reset flag to 0 if exception was caught
				inputIntegers[2] = 0;
			}

		}

		// repeat loop until proper input is given
		while (inputIntegers[3] != 1) {
			// set the flag for proper string input
			inputIntegers[3] = 1;

			// try block for string exceptions
			try {
				// query for a sentence to mutate
				System.out.print("Enter a sentence to substring: ");
				rawInput[2] = input.nextLine();
				// print the substring if index not out of range
				System.out.println("The substring with indices [" +
					inputIntegers[0] + "," +
					inputIntegers[1] + "] is: " +
					rawInput[2].substring(inputIntegers[0],inputIntegers[1]));
			// catch block for string exceptions
			} catch (StringIndexOutOfBoundsException stringException) {
				// System.out.println(stringException.toString())
				System.out.println(stringException.getMessage() +
					" for the string: \"" + rawInput[2] + "\"\n");
				// reset flag to 0 if exception was caught
				inputIntegers[3] = 0;
			}

		}
	}
}
