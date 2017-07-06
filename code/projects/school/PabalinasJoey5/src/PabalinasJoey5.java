/**
 * This program queries for the user's age
 * in days, and then converts that number
 * to a years/days format and output it.
 * It also queries the current military time,
 * parses it, and then output it in standard
 * civilian time format.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 5
 * 05/22/17
 */
import java.util.Scanner;
public class PabalinasJoey5 {
	/**
	* The main() method signifies this is
	* a program and not a library.
	*
	* @param args The commandline arguments are not used.
	*/
	public static void main(String[] args) {
		// constant for days in a year
		final int DAYS_IN_YEAR = 365;
		// instantiate a Scanner object
		Scanner input = new Scanner(System.in);

		// query the user's age in days and convert to an integer
		System.out.print("\nEnter your age in days: ");
		String ageString = input.nextLine();
		Integer ageDays = Integer.parseInt(ageString);
		// perform days to years/days conversion
		Integer ageYears = ageDays / DAYS_IN_YEAR;
		Integer ageDaysRemainder = ageDays % DAYS_IN_YEAR;
		// output results
		System.out.println("Your age: " +
			ageYears + " years and " +
			ageDaysRemainder + " days.\n");

		// query for military time
		System.out.print("\nEnter the current military time: ");
		String militaryTimeString = input.nextLine();
		//convert the input string to an int
		int militaryTime = Integer.parseInt(militaryTimeString);
		/*
		 * convert the input military time to numeric civilian format
		 * and set a flag parameter if it is past noon
		 */
		int civilianTime[] = {
			(militaryTime % 1200),
			(2400 / militaryTime)
		};
		// calculate the minutes, hours, and string suffix from the current time
		Integer civilianMinutes =  civilianTime[0] % 100;
		Integer civilianHours = (civilianTime[0] - civilianMinutes) / 100;
		String timeSuffix = (civilianTime[1] == 0) ? "am" : "pm";
		// print formatted civilian time string
		System.out.println("Current civilian time: " +
			civilianHours + ":" +
			civilianMinutes +
			timeSuffix + "\n");
	}
}
