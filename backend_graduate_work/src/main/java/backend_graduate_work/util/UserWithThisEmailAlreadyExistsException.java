package backend_graduate_work.util;

public class UserWithThisEmailAlreadyExistsException extends RuntimeException{
    public UserWithThisEmailAlreadyExistsException() {
        super("Email already taken");
    }
}
