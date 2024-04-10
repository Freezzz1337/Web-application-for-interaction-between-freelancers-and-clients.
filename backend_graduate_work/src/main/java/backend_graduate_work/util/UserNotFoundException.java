package backend_graduate_work.util;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String searchLine) {
        super("User with this name \"" + searchLine + "\" was not found");
    }
}