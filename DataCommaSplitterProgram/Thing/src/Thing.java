import java.util.*;

public class Thing {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        while(true) {
            String text = input.next();
            String finalString = "";
            String[] splitText = text.split("\n");
            for(String s : splitText) {
               finalString += "<tr>";
               String[] splitAgain = s.split(",");
               for(String t : splitAgain) {
                   finalString = "<td>" + t + "</td>";
               }
               finalString = finalString + "</tr>";
            }
             
             
            System.out.println(finalString);
            
        }
    }
}
