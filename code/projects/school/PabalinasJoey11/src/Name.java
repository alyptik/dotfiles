/**
 * this class has two static variables
 * containing a first and last name, and
 * two static methods,one that returns the
 * initials of the supplied name, and one
 * that returns the first name and last name
 * in all lowercase and all uppercase
 * respectively
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 10
 * 06/05/17
 */

public class Name {
	// initialize static string constants containing the first and last name
	public static final String firstName = "Joey";
	public static final String lastName = "Pabalinas";

	/**
	 * this method returns the initials of the supplied name
	 *
	 * @return the generated initials
	 */
	public static String getInitials() {
		return firstName.substring(0, 1) +
			". " +
			lastName.substring(0, 1) +
			".";
	}

	/**
	 * this method returns the supplied first name in all
	 * lowercase and the supplied last name in all uppercase
	 *
	 * @return the mutated first and last name
	 */
	public static String getLowerFirstUpperLast() {
		return firstName.toLowerCase() +
			" " +
			lastName.toUpperCase();
	}
}
