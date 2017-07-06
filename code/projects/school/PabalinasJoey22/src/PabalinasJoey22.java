/**
 * This program prints out the
 * args[] String array, attempts
 * to parse each argument as an int,
 * calculates the average and sum,
 * and prints all the integer arguments
 * as well as the calculated values.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 22
 * 06/17/17
 */

public class PabalinasJoey22 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args all arguments are printed along with the count of integer arguments
	 */
	public static void main(String[] args) {

		// try block to catch exceptions
		try {
			// count of integer args
			int count = 0;
			// initialize int variable to hold the running total
			int total = 0;
			// declare int variable to hold the average
			double average;
			// initialize an int array for each int argument
			int intArgs[] = new int[args.length];

			// print all the arguments
			System.out.print("Arguments passed: ");
			// loop over each arg and attempt to parse it as an int
			for (int i = 0; i < args.length; i++) {
				System.out.print(args[i] +
					((i < args.length - 1) ? ", " : "\n"));
				// try block for int parsing
				try {
					// attempt to parse arg as an integer
					intArgs[i] = Integer.parseInt(args[i]);
					// shift off invalid indices and increment count
					intArgs[count++] = intArgs[i];
				// no-op catch block for non integers
				} catch (NumberFormatException numberError) {}
			}

			// print all the integer arguments
			System.out.print("Integer arguments passed: ");
			for (int i = 0; i < count; i++) {
				System.out.print(intArgs[i] +
					((i < count - 1) ? ", " : "\n"));
				// add each integer argument total
				total += intArgs[i];
			}

			// divide by the count of integer arguments to get the average
			average = (double)total / ((count == 0) ? 1 : count);

			// display the count of int args and their sum/average
			System.out.println("Number of integer arguments: " + count);
			System.out.println("Sum of integer arguments: " + total);
			System.out.printf("%s: %.2f\n", "Average of integer arguments", average);

		// catch block for divide by zero exception
		} catch (ArithmeticException arithmeticError) {
			System.out.println("ERROR: Arithmetic exception thrown during calculation. - INPUT: " +
				arithmeticError.getLocalizedMessage());

		// catch block for no input
		} catch (NullPointerException nullError) {
			System.out.println("ERROR: Empty argument string. - INPUT: " +
				nullError.getLocalizedMessage());
		}
	}
}
