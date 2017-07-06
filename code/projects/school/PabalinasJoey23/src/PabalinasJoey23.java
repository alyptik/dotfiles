/**
 * This program reads words from a
 * filename provided by the user, and writes
 * them to stdout as well as to an output
 * filename provided by the user; exceptions
 * are caught and handled gracefully.
 *
 * @author Pabalinas, Joey
 * ICS 111 Assignment 23
 * 06/17/17
 */

// needed for file not found exception
import java.io.FileNotFoundException;
// needed for file IO
import java.util.*;
import java.io.*;

public class PabalinasJoey23 {
	/**
	 * The main() method starts the program.
	 *
	 * @param args all arguments are printed along with the count of integer arguments
	 */
	public static void main(String[] args) {

		// try block to catch exceptions
		try {
			// instantiate String[1000] array for file buffer
			String buffer[] = new String[1000];
			// initialize line indices counter
			int wordCount = 0;

			// throw exception if wrong number of args given
			if (args.length < 2) {
				throw new NullPointerException();
			}

			// initialize String to hold output filename
			String outputFile = args[1];
			// initialize input File object
			File inputFile = new File(args[0]);
			// initialize PrintWriter and Scanner objects
			PrintWriter writer = new PrintWriter(outputFile);
			Scanner reader = new Scanner(inputFile);

			// read words from input file and append them to the buffer
			while (reader.hasNext()) {
				buffer[wordCount++] = reader.next();
			}

			// write to output file and display lines read
			for (int i = wordCount - 1; i > -1; i--) {
				System.out.println("buffer[" + i + "]: " + buffer[i]);
				writer.println(buffer[i]);
			}

			// close the reader/writer
			reader.close();
			writer.close();

		// catch block for file not found
		} catch (FileNotFoundException fileError) {
			System.out.println("ERROR: File not found. - INPUT: " +
				fileError.getLocalizedMessage());

		// catch block for wrong number of arguments
		} catch (NullPointerException nullError) {
			System.out.println("ERROR: Incorrect number of arguments: 2 needed. Args provided: " +
				args.length);
		}
	}
}
