/**
 * this is the interface for the GroceryItem
 * class which has three data fields,
 * name, price, and count, representing
 * attributes of a grocery store item
 * that are initialized by the constructor,
 * as well as a toString method that returns
 * the String representation of the data fields
 * plus an amount() method to retrieve the
 * result of the expression “price * count”
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 15
 * 06/11/17
 */

public interface GroceryItemInterface {
	// data attributes for the GroceryItem class
	// private String name;
	// use primitives to prevent autoboxing/unboxing
	// private float price;
	// private int count;

	/**
	 * contructor that initializes the data fields
	 *
	 * @param itemName the name of the item
	 * @param itemPrice the price of the item
	 * @param itemCount the count of the item
	 */
	// prototype not needed for constructors
	// void GroceryItem(String itemName, float itemPrice, int itemCount);

	/**
	 * this method evaluates the “price * count” expression
	 * for the current object and returns the result
	 * as a float
	 *
	 * @return the float result of the expression “price * count”
	 * a String representation of object's data fields
	 */
	float amount();

	/**
	 * this method returns a concatenated String
	 * of the object's data fields
	 *
	 * @return a String representation of object's data fields
	 */
	String toString();
}
