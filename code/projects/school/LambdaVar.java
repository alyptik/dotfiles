import java.util.function.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public final class LambdaVar {

    public static void main(final String[] args) {
        new LambdaVar().run();
    }

    private void run() {
        final Predicate<Integer> selectEven = v -> 0 == v % 2;
        final Predicate<Integer> selectOdd = v -> 0 != v % 2;
        final Scanner input = new Scanner(System.in);
        final List<Integer> values = new ArrayList<>();
        final Predicate<Integer> op;

        System.out.println("Which should I use: [e]ven or odd?");
        op = "e".equals(input.next())? selectEven : selectOdd;

        System.out.println("Yo give me sum integers (and end the stream):");
        while (input.hasNextInt()) {
            values.add(input.nextInt());
        }

        values.stream()
            .filter(op)
            .map(v -> v / 2)
            .forEach(System.out::println);
    }
}
