import javax.xml.transform.stax.StAXSource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        System.out.println(Kata.firstNonRepeatingLetter("aA"));

    }
}

class Kata {
    public static String firstNonRepeatingLetter(String s) {
        String[] stringList = s.split("");


        for (int i = 0; i < stringList.length; i++) {
            int count = 0;

            for (int j = 0; j < stringList.length; j++) {
                if (stringList[j].toLowerCase().equals(stringList[i].toLowerCase())) {
                    count++;
                }
            }

            if (count <= 1){
                return stringList[i];
            }
        }
        return "";

    }
}





//    public static String firstNonRepeatingLetter(String s) {
//        String[] stringList = s.split("");
//
//
//        for (int i = 0; i < stringList.length; i++) {
//            int count = 0;
//
//            for (int j = 0; j < stringList.length; j++) {
//                if (stringList[j].equals(stringList[i])) {
//                    count++;
//                }
//            }
//
//            if (count <= 1){
//                return stringList[i];
//            }
//        }
//        return "";
//
//    }