/**
 * this class has three data fields,
 * name, price, and count, representing
 * attributes of a grocery store item
 * that are initialized by the constructor,
 * as well as a toString method that returns
 * the String representation of the data fields
 * plus an amount() method to retrieve the
 * result of the expression “price * count”
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 14
 * 06/08/17
 */

public class GroceryItem {
	// data attributes for the GroceryItem class
	private String name;
	// use primitives to prevent autoboxing/unboxing
	private float price;
	private int count;

	/**
	 * contructor that initializes the data fields
	 *
	 * @param itemName the name of the item
	 * @param itemPrice the price of the item
	 * @param itemCount the count of the item
	 */
	GroceryItem(String itemName, float itemPrice, int itemCount) {
		name = itemName;
		price = itemPrice;
		count = itemCount;
	}

	/**
	 * this method evaluates the “price * count” expression
	 * for the current object and returns the result
	 * as a float
	 *
	 * @return the float result of the expression “price * count”
	 * a String representation of object's data fields
	 */
	float amount() {
		return price * count;
	}

	/**
	 * this method returns a concatenated String
	 * of the object's data fields
	 *
	 * @return a String representation of object's data fields
	 */
	public String toString() {
		return String.format("%s\t\t$%.2f\t\t%5d\t\t$%.2f",
			name, price, count, this.amount());
	}

}
