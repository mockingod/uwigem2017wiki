import java.util.*;

public class Thing {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        while(true) {
            System.out.print("Input:");
            
            String text = input.nextLine();
            
            String[] splitText = text.split("\t");
            
            
            String finalString = "";
            
            
            
            
            
            for(int i = 0; i < splitText.length; i++) {
                finalString = finalString + splitText[i] + ",";
            }
            finalString = finalString.substring(0,finalString.length()-1);
            
            System.out.println(finalString);
            
        }
    }
}
