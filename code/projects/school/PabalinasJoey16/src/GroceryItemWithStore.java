/**
 * this child class inherits from its parent
 * class, GroceryItem, and has four data fields,
 * store, name, price, and count, representing
 * attributes of a grocery store item
 * that are initialized by the constructor,
 * as well as a toString() method that returns
 * the String representation of the data fields
 * plus an amount() method to retrieve the
 * result of the expression “price * count”
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 16
 * 06/12/17
 */

public class GroceryItemWithStore extends GroceryItem {
	// data attributes for the GroceryItemWithStore class
	// narrow scope from protected to private
	private String store;

	/**
	 * constructor that initializes the data fields and
	 * calls the constructor of the superclass
	 *
	 * @param itemName the name of the item
	 * @param itemPrice the price of the item
	 * @param itemCount the count of the item
	 * @param storeName the store where the item was bought
	 */
	GroceryItemWithStore(String itemName, float itemPrice, int itemCount, String storeName) {
		super(itemName, itemPrice, itemCount);
		store = storeName;
	}

	/**
	 * this method evaluates the “price * count” expression
	 * for the current object and returns the result
	 * as a float
	 *
	 * @return the float result of the expression “price * count”
	 * a String representation of object's data fields
	 */
	// no need to overload this method
	//float amount() {
	//	return price * count;
	//}

	/**
	 * this method returns a concatenated String
	 * of the object's data fields
	 *
	 * @return a String representation of object's data fields
	 */
	public String toString() {
		return String.format("%s\t\t$%.2f\t\t%5d\t\t$%.2f\t\t%s",
			name, price, count, amount(), store);
	}

}
