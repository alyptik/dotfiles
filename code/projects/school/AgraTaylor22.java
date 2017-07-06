public class AgraTaylor22 {
	public static void main(String[] args) {
		if(args.length == 0) {
			System.out.print("\nProgram output:  ");
			System.out.println("\nNumber of command line arguments is 0.");
			return;
		}

		int integers[] = new int[args.length];
		int counter = 0;

		for(int i = 0; i < args.length; i++)
			integers[i] = Integer.parseInt(args[i]);

		System.out.print("\nCommand line arguments: ");

		for (int i : integers)
			System.out.print(i + ((++counter < integers.length) ? ", " : "\n"));
	}
}
