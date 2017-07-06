/**
 * This program prints out an ArrayList of
 * Doubles containing the high temperatures
 * of the week, which are read from
 * the user. Input is read 7 times in
 * a for loops, and then printed along with
 * the average; exceptions are gracefully
 * handled.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 21
 * 06/17/17
 */

// for the Scanner class
import java.util.*;

public class PabalinasJoey21 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {
		// integer counter for loops
		int i = 0;
		// temperature average
		double average = 0;

		// start scope for the example arrays
		{
			// declare array containing the high temperatures for the week
			{ Double weekTemps[] = new Double[5]; }

			// instantiate array containing the high temperatures for the week
			Double weekTemps[] = {78.5d, 79.1d, 89.2d, 90.4d, 83.9d,};

			// loop over and print the temperatures
			for (Double temp : weekTemps) {
				System.out.print(temp);
				System.out.print(temp.equals(weekTemps[weekTemps.length - 1]) ? "\n" : ", ");
			}

			// initialize array containing the high temperatures for the week
			for (i = 0; i < 5; i++) {
				weekTemps[i] = 78.6d + (i * i);
			}

			// loop over and print the temperatures
			for (Double temp : weekTemps) {
				System.out.print(temp);
				System.out.print(temp.equals(weekTemps[weekTemps.length - 1]) ? "\n" : ", ");
			}
		}

		// Scanner object to store input
		Scanner stdInput = new Scanner(System.in);
		// instantiate double array to hold temps
		ArrayList<Double> weekTemps = new ArrayList<>();

		// loop 7 times to query the user for 7 temperatures
		for (i = 0; i < 7; i++) {
			// repeat current iteration until correct input is given
			try {
				System.out.print("Please enter temperature #" +
					(i + 1) + ": ");
				String inputStr = stdInput.nextLine();
				weekTemps.add(i, Double.parseDouble(inputStr));
				if (weekTemps.get(i).compareTo(-459.67d) < 0) {
					i--;
				}

			// catch block for number format exception
			} catch (NumberFormatException numberError) {
				System.out.println("ERROR: Error parsing double. - INPUT: " +
					numberError.getLocalizedMessage());
				// repeat current iteration
				i--;

			// catch block for no input
			} catch (NullPointerException nullError) {
				System.out.println("ERROR: Empty input string. - INPUT: " +
					nullError.getLocalizedMessage());
				// repeat current iteration
				i--;

			// catch block for illegal format
			} catch (IllegalFormatException formatError) {
			System.out.println("ERROR: Illegal format error. - INPUT: " +
				formatError.getLocalizedMessage());
				// repeat current iteration
				i--;
			}
		}

		// loop over and print the temperatures
		System.out.print("Week Temperature List: { ");
		for (i = 0; i < 7; i++) {
			System.out.print(weekTemps.get(i) + ((i < 6) ? ", " : " }\n"));
			// add current temp to the average variable
			average += weekTemps.get(i);
		}

		// finish average calculation
		average /= 7;
		// print the average
		System.out.printf("%s %.2f\n", "Week Temperature Average: ", average);
	}
}
