/**
 * this program instantiates five
 * GroceryItem objects and initializes
 * their data fields, then prints out
 * both their respective data-field String
 * representations using the toString()
 * method and the running total of all
 * the GroceryItems combined
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 14
 * 06/08/17
 */

public class PabalinasJoey14 {
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
		// declare a float to hold the running total
		float totalAmount = 0.00f;

		// print the header
		System.out.println("item\t\tprice\t\tcount\t\tamount");
		for (GroceryItem item : items) {
			System.out.println(item.toString());
			// add the current item's amount to the running total
			totalAmount += item.amount();
		}
		// print the total of all the GroceryItems
		System.out.printf("\n\t\t\t\t\t\t%s\t\t$%.2f\n", "TOTAL:", totalAmount);
	}
}

