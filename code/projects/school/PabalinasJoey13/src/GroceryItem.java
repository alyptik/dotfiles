/**
 * this class has three data fields,
 * name, price, and count, representing
 * attributes of a grocery store item
 * that are initialized by the constructor,
 * as well as a toString method that returns
 * the String representation of the data fields
 * plus getter and setter methods for each
 * data field.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 13
 * 06/07/17
 */

public class GroceryItem {
	// data attributes for the GroceryItem class
	private String name;
	private Float price;
	private Integer count;

	/**
	 * contructor that initializes the data fields
	 *
	 * @param itemName the name of the item
	 * @param itemPrice the price of the item
	 * @param itemCount the count of the item
	 */
	GroceryItem(String itemName, Float itemPrice, Integer itemCount) {
		name = itemName;
		price = itemPrice;
		count = itemCount;
	}

	/**
	 * this method returns a concatenated String
	 * of the object's data fields
	 *
	 * @return a String representation of object's data fields
	 */
	public String toString() {
		return String.format("%s\t\t$%.2f\t\t%5d", name, price, count);
	}

	/**
	 * sets the name data field
	 *
	 * @param inputName the name of the item
	 */
	 void setName(String inputName) {
		name = inputName;
	}

	/**
	 * sets the price data field
	 *
	 * @param inputPrice the price of the item
	 */
	 void setPrice(Float inputPrice) {
		price = inputPrice;
	}

	/**
	 * sets the count data field
	 *
	 * @param inputCount the count of the item
	 */
	 void setCount(Integer inputCount) {
		count = inputCount;
	}

	/**
	 * retrieves the name data field
	 *
	 * @return the name data field of the object
	 */
	 String getName() {
		return name;
	}

	/**
	 * retrieves the price data field
	 *
	 * @return the price data field of the object
	 */
	 Float getPrice() {
		return price;
	}

	/**
	 * retrieves the count data field
	 *
	 * @return the count data field of the object
	 */
	 Integer getCount() {
		return count;
	}
}
