import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public final class Lambda {

    public static void main(final String[] args) {
        new Lambda().run();
    }

    private void run() {
        final Scanner input = new Scanner(System.in);
        final List<Integer> values = new ArrayList<>();

        System.out.println("Yo give me sum integers (and end the stream):");
        while (input.hasNextInt()) {
            values.add(input.nextInt());
        }

        values.stream()
            .filter(v -> 0 == v % 2)
            .map(v -> v / 2)
            .forEach(System.out::println);
    }
}
