/**
 * This program prints a 10×10
 * multiplication table with 2
 * nested for loops as well as
 * initializes and prints a
 * 10×10 matrix with 2 nested
 * for loops.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 24
 * 06/17/17
 */

public class PabalinasJoey24 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args all arguments are printed along with the count of integer arguments
	 */
	public static void main(String[] args) {
		// constants to hold matrix size
		final int ROWS = 10;
		final int COLUMNS = 10;
		// initialize 2d int matrix
		int matrix[][] = new int[ROWS][COLUMNS];

		// nested loop to print multiplication table
		for (int i = 1; i < 11; i++) {
			for (int j = 0; j < 10; j++) {
				System.out.println(i + " × " + j + " = " + (i * j));
			}
			// separate outer loop sections with a newline
			System.out.println();
		}

		// nested loop to initialize 2d matrix
		for (int i = 0; i < ROWS; i++) {
			for (int j = 0; j < COLUMNS; j++) {
				matrix[i][j] = (i + 1) * (j + 1);
			}
		}

		// nested loop to print formatted matrix
		System.out.println("[10 × 10] Matrix multiplication table in a table format:");
		for (int i = 0; i < ROWS + 1; i++) {
			for (int j = 0; j < COLUMNS + 1; j++) {
				// offset columns and rows by one to draw separator
				if (i > 0 && j > 0) {
					// print indices of the matrix
					System.out.printf("%3d", matrix[i - 1][j - 1]);
					System.out.print((j < COLUMNS) ? "\t\t" : "");
				} else if (i == 0) {
					// draw horizontal separator if on first row
					System.out.print("\u2015\u2015\u2015\u2015\u2015\u2015\u2015");
				} else if (j == 0) {
					// draw vertical separator if on first column
					System.out.print("\u007C");
				}
			}
			// separate outer loop sections with a newline
			System.out.println();
		}
	}
}
