/**
 * this program instantiates five
 * GroceryItemWithStore objects and initializes
 * their data fields, then prints out
 * both their respective data-field String
 * representations using the toString()
 * method and the running total of all
 * the GroceryItemWithStores combined
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 16
 * 06/12/17
 */

public class PabalinasJoey16 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args The commandline arguments are not used.
	 */
	public static void main(String[] args) {
		// instantiate array of five GroceryItemWithStore objects
		GroceryItemWithStore items[] = {
			new GroceryItemWithStore("Pepsi", 5.68f, 7, "Walmart"),
			new GroceryItemWithStore("Coke", 7.68f, 32, "Safeway"),
			new GroceryItemWithStore("Itoen", 10.99f, 12, "Longs"),
			new GroceryItemWithStore("Doritos", 25.17f, 21, "Walmart"),
			new GroceryItemWithStore("Cheetos", 8.23f, 9, "Longs"),
		};

		// declare a float to hold the running total
		float totalAmount = 0.00f;

		// print the header
		System.out.println("item\t\tprice\t\tcount\t\tamount\t\tstore");
		for (GroceryItem item : items) {
			// print each object's data fields
			System.out.println(item.toString());
			// add the current item's amount to the running total
			totalAmount += item.amount();
		}
		// print the total of all the GroceryItemWithStores
		System.out.printf("\n\t\t\t\t\t\t\t\t\t%s\t\t$%.2f\n", "TOTAL:", totalAmount);
	}
}

