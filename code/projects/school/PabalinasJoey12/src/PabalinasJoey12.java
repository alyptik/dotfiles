/**
 * this program instantiates five
 * GroceryItem objects and initializes
 * their data fields, then prints out
 * their respective data-field String
 * representations
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 12
 * 06/05/17
 */

public class PabalinasJoey12 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {
		// instantiate five String objects for each GroceryItem object
		GroceryItem items[] = new GroceryItem[] {
			new GroceryItem("Pepsi", 5.68f, 7),
			new GroceryItem("Coke", 7.68f, 32),
			new GroceryItem("Itoen", 10.99f, 12),
			new GroceryItem("Doritos", 25.17f, 21),
			new GroceryItem("Cheetos", 8.23f, 9),
		};

		// print out the formatted data fields of each object
		for (GroceryItem item : items) {
			System.out.println(item.toString());
		}
	}
}

