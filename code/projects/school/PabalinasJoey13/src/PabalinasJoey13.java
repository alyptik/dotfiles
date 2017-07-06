/**
 * this program instantiates five
 * GroceryItem objects and initializes
 * their data fields, then prints out
 * their respective data-field String
 * representations using the toString()
 * method, mutates the data fields with
 * their respective setter methods,
 * and retrieves those fields with
 * their respective getter methods
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 13
 * 06/07/17
 */

public class PabalinasJoey13 {
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

		// add a newline
		System.out.println("");
		// retrieve and print the data fields of the first GroceryItem
		System.out.println("Name of item #1: " + items[0].getName());
		System.out.println("Price of item #1: $" + items[0].getPrice());
		System.out.println("Count of item #1: " + items[0].getCount());

		// add a newline
		System.out.println("");
		// set the data fields of the second GroceryItem
		items[1].setName("Dogfood");
		items[1].setPrice(15.32f);
		items[1].setCount(items[1].getCount() +
			(int)((((System.currentTimeMillis() << 2) ^ 0xFFF) & 0x3E8) >> 3));
		// retrieve and print the data fields of the second GroceryItem separately
		System.out.println("Name of item #2: " + items[1].getName());
		System.out.println("Price of item #2: $" + items[1].getPrice());
		System.out.println("Count of item #2: " + items[1].getCount());
		// use the toString() method to print the fields of the second GroceryItem
		System.out.println(items[1].toString());

		// add a newline
		System.out.println("");
		// loop through the final 3 grocery items
		for (int i = 2; i < items.length; i++) {
			// increment the count by 100 and print it
			items[i].setCount(items[i].getCount() + 100);
			System.out.println("Count of item #" +
				(i + 1) + ": " + items[i].getCount());
		}
		// loop through the final 3 grocery items one last time
		for (int i = 2; i < items.length; i++) {
			// use the toString() method to print the fields of each GroceryItem
			System.out.println(items[i].toString());
		}
	}
}

