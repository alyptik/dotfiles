/**
 * This program prints out 3 different
 * sequences of integers with for loops,
 * loops over a user-input sentence to print
 * each character of that sentence on its own
 * line, and prints the number of matches for
 * a user-input character in a user-input
 * sentence.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 20
 * 06/17/17
 */

// for the Scanner class
import java.util.*;

public class PabalinasJoey20 {

	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {
		// Scanner object to store input
		Scanner stdInput = new Scanner(System.in);
		// integer to hold the count of characters matched in the input sentence
		int count = 0;

		// count from 10 through 1, in steps of -1
		for (int i = 10; i > 0; i--) {
			System.out.print(i);
			System.out.print((i > 1) ? ", " : "\n");
		}

		// count from -100 through 0, in steps of +5
		for (int i = -100; i < 5; i += 5) {
			System.out.print(i);
			System.out.print((i < 0) ? ", " : "\n");
		}

		// count from 1 through 1024, multiplying by 2 each step
		for (int i = 1; i < 2048; i <<= 2) {
			System.out.print(i);
			System.out.print((i < 1024) ? ", " : "\n");
		}

		// try block to catch exceptions
		try {
			// query for the first sentence
			System.out.print("Please enter a sentence: ");
			String inputStr = stdInput.nextLine();

			// throw exception if empty string
			if (inputStr.equals("")) {
				throw new NullPointerException();
			}

			// loop over the string, printing each char on it's own line
			for (char c : inputStr.toCharArray()) {
				System.out.print(c + "\n");
			}

			// query for the second sentence
			System.out.print("Please enter another sentence: ");
			inputStr = stdInput.nextLine();

			// query for char to match
			System.out.print("Please enter a character: ");
			char inputChar = stdInput.nextLine().charAt(0);

			// throw exception if empty string or char
			if (inputStr.equals("") || inputChar == 0x0) {
				throw new NullPointerException();
			}

			// for each byte in the sentence, bitwise AND it with the input char
			for (int i = 0; i < inputStr.getBytes().length; i++) {
				// if found, increment the count variable
				count += ((inputChar & inputStr.getBytes()[i]) == inputChar) ? 1 : 0;
			}

			// print the count of characters found in the sentence
			System.out.println("The sentence you entered:\n\t\"" +
					inputStr + "\"\ncontains " +
					count + " \"" + inputChar + "\" " +
					"characters.");

		// catch block for no input
		} catch (NullPointerException nullError) {
			System.out.println("ERROR: Empty input string. - INPUT: " +
				nullError.getLocalizedMessage());

		// catch block for illegal format
		} catch (IllegalFormatException formatError) {
			System.out.println("ERROR: Illegal format error. - INPUT: " +
				formatError.getLocalizedMessage());
		}
	}
}
