/**
 * This program outputs a user's
 * initials after reading their
 * name from standard input. It
 * then reads a sentence and then
 * outputs that sentence back
 * with the first five letters
 * changed to lowercase and
 * the rest of the string changed
 * to uppercase.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 4
 * 05/22/17
 */
import java.util.Scanner;
public class PabalinasJoey4 {
	/**
	* The main() method signifies this is
	* a program and not a library.
	*
	* @param args The commandline arguments are not used.
	*/
	public static void main(String[] args) {
		// instantiate a Scanner object
		Scanner input = new Scanner(System.in);
		// initialize an empty 3-member String array
		String line[] = new String[3];

		// read user's name from stdin
		System.out.print("\n\nEnter your first name: ");
		line[0] = input.nextLine();
		System.out.print("Enter your last name: ");
		line[1] =  input.nextLine();

		// make sure the strings are uppercase
		line[0] = line[0].toUpperCase();
		line[1] = line[1].toUpperCase();

		/*
		 * output the user's initials by taking the
		 * first letter of each array member.
		 */
		System.out.println("Your initials: " +
			line[0].substring(0,1) + "." +
			line[1].substring(0,1) + ".\n");

		// repeat prompt if the string is too short
		do {
			// read sentence from stdin
			System.out.print("\nEnter your sentence: ");
			line[2] = input.nextLine();
		} while (line[2].length() < 5);

		// store upper/lowercase variants of input
		line[0] = line[2].toLowerCase();
		line[1] = line[2].toUpperCase();

		// output transformed string
		System.out.println("Output: " +
			line[0].substring(0,5) +
			line[1].substring(4) + "\n");
	}
}
