/**
 * this program outputs the supplied
 * first and last name, the initials,
 * and the first name and last name
 * in all lowercase and all uppercase
 * respectively
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 11
 * 06/05/17
 */

// for GUI Dialogue Windows
import javax.swing.*;

public class PabalinasJoey11 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {
		// output first and last name and its mutations
		JOptionPane.showMessageDialog(null,
			Name.firstName + " " + Name.lastName +
				"\n" +
				Name.getInitials() +
				"\n" +
				Name.getLowerFirstUpperLast());
	}
}
