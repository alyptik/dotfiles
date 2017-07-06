/**
* In this program we use scanner to capture user's input then we do simple conversions.
* Then we use array method to hold all our variables, we then use if and else statements
* to capture any number below zero. We also use for loops, and exceptions for non integers.
*
* @author Lam, Brian
* ICS 111 Assignment 22
* June 27, 2017
*/ 

import java.util.Scanner;

public class LamBrian22{
   //static method integer arrays
   public static Integer[] integers = new Integer[0];
   //static method outputting lines
   public static void main(String[] args){
      //scanner for user input 
      Scanner input = new Scanner(System.in);
      //print "Command line arguments"
      System.out.print("Command line arguments: ");
      //string to capture user's input of numbers
      String numbers = input.nextLine();
      /*if statement for no numbers
      *@param numbers.isEmpty 
      */
      if(numbers.isEmpty()){
         //print "Program output: "
         System.out.println("Program output: ");
         //print "Number of command line arguments is 0."
         System.out.println("Number of command line arguments is 0.");
      }
      //else statement following if statement
      else{
         //print "Program output: "
         System.out.println("Program output: ");
         //seperate string into tokens
         String[] tokens = numbers.split(" ");
         //print "Number of command line arguments is + token variable length + "." in betweeen 
         System.out.println("Number of command line arguments is " + tokens.length + "." );
         //print "They are: " + numbers"
         System.out.println("They are: " + numbers);
         //for loop int i , i less than tokens , i+1
         for(int i = 0; i<tokens.length; i = i + 1){ 
            //try block for integer
            try{
               //integer named k , convert integers
               Integer k = Integer.parseInt(tokens[i]);
               //class add conversions
               LamBrian22.add(k);
            }//catch any non-integers
            catch(NumberFormatException e){}
         }//print "The numbers of integers is: + numbers of integers"
         System.out.println("The numbers of integers is: " + integers.length);
         //print "They are: "
         System.out.print("They are: ");
         //for loop containing int i= 0 , i less than integers length, i increase by 1
         for(int i=0; i<integers.length; i++){
            //print integer i with space
            System.out.print(integers[i]+ " ");
         }//print next line "The sum is: " + class sum
         System.out.println("\nThe sum is: " + LamBrian22.sum());
         //print "The average is: " + class average
         System.out.println("The average is: " + LamBrian22.average());
      }
   }// adding (integer called num)
   public static void add (Integer num){
      //size of number of integers (numbers only)
      int size = integers.length;
      //integer array copy
      Integer[] copy = new Integer[size];
      //for loop int i = 0, i less than size, i +1
      for(int i = 0; i<size; i = i+1){
         //copy index i of integers
         copy[i] = integers[i];
      }//integer size +1
      integers = new Integer[size + 1];
      //for loop int i = 0, i less than size, i = i + 1
      for(int i = 0; i<size; i = i+1){
         //integers index i = copy i 
         integers[i] = copy[i];
      }//integers size from num string
      integers[size] = num;
   }//integer containing sum
   public static Integer sum(){
      //start with 0
      Integer sum = 0;
      //for loop int i = 0, i less than integers length, i + 1
      for(int i = 0; i<integers.length; i = i + 1){
         //sum add with index i integers
         sum = sum + integers[i];
      }//return sum of integers
      return sum;
   }// double for decimals of average of total
   public static Double average(){
      //decimal sum 0.0
      Double sum = 0.0;
      //for int i = 0, i less than integers length, i + 1
      for(int i=0; i<integers.length; i = i + 1){
         //sum + index i integers
         sum = sum + integers[i];
      }//decimal average is sum divide by total integers
      Double average = sum/integers.length;
      //return average total
      return average;
   }//end of class
   

}

      
