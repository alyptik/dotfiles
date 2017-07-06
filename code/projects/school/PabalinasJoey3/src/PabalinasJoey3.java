/**
 * This program instantiates a string
 * variable with my full name, permutes
 * the case of that name, transforms
 * it into my initials as well as a
 * formatted email address, and then
 * prints the original String
 * and its mutations.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 3
 * 05/21/17
 */
public class PabalinasJoey3 {
	public static void main(String[] args) {
		/*
		 * new is somewhat redundant here;
		 * String objects can me instantiatied with
		 * String foo = "bar"
		 */
		String fullName = /* new String("Joey Pabalinas"); */
			"Joey Pabalinas";
		System.out.println("\nFull Name: " + fullName + "\n");

		String initials = fullName.substring(0,1) + ". " +
			fullName.substring(5,6) + ".";
		System.out.println("Initials: " + initials + "\n");

		// no need to instantiate with empty constructor
		String lowerName = /* = new String(""); */
			 fullName.toLowerCase();
		String upperName = fullName.toUpperCase();
		System.out.println("Case Permutations: " + lowerName + " / " + upperName + "\n");

		// split the lowercase full name on spaces
		// and assign the results to a string array
		String lowerSplitName[] = lowerName.split(" ");
		// instantiate object with formated email address
		String emailAddress = lowerSplitName[0] + "." +
			lowerSplitName[1] + "@hawaii.edu";
		System.out.println("Email Address: " + emailAddress + "\n");
	}
}
