package uptrip.exception;


public class AuthorizationException extends Exception {

    public static final String ROLE_NOT_FOUND_MESSAGE = "Role is not found.";
    public static final String USERNAME_ALREADY_IN_USE_MESSAGE = "Username is already taken!";
    public static final String EMAIL_ALREADY_IN_USE_MESSAGE = "Email is already taken!";


    public AuthorizationException(String errorMessage) {
        super(errorMessage);
    }
}
