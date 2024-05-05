package backend_graduate_work.exceptions;

import backend_graduate_work.util.ProjectCommentAlreadyLeftException;
import backend_graduate_work.util.UserNotFoundException;
import backend_graduate_work.util.UserWithThisEmailAlreadyExistsException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail handleBadCredentialsException(BadCredentialsException exception) {
        return createProblemDetail(HttpStatusCode.valueOf(401), exception.getMessage(), "The username or password is incorrect");
    }

    @ExceptionHandler(AccountStatusException.class)
    public ProblemDetail handleAccountStatusException(AccountStatusException exception) {
        return createProblemDetail(HttpStatusCode.valueOf(403), exception.getMessage(), "The account is locked");
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDeniedException(AccessDeniedException exception) {
        return createProblemDetail(HttpStatusCode.valueOf(403), exception.getMessage(), "You are not authorized to access this resource");
    }

    @ExceptionHandler(SignatureException.class)
    public ProblemDetail handleSignatureException(SignatureException exception) {
        return createProblemDetail(HttpStatusCode.valueOf(403), exception.getMessage(), "The JWT signature is invalid");
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ProblemDetail handleExpiredJwtException(ExpiredJwtException exception) {
        return createProblemDetail(HttpStatusCode.valueOf(403), exception.getMessage(), "The JWT token has expired");
    }

    @ExceptionHandler(UserWithThisEmailAlreadyExistsException.class)
    public ProblemDetail handleUserWithThisEmailAlreadyExistsException(UserWithThisEmailAlreadyExistsException exception) {
        return createProblemDetail(HttpStatus.CONFLICT, exception.getMessage(), "A user with this email address already exists");
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFoundException(UserNotFoundException exception) {
        return createProblemDetail(HttpStatus.BAD_REQUEST, exception.getMessage(), exception.getMessage());
    }


    @ExceptionHandler(ProjectCommentAlreadyLeftException.class)
    public ProblemDetail handleProjectCommentAlreadyLeftException(ProjectCommentAlreadyLeftException exception) {
        return createProblemDetail(HttpStatus.BAD_REQUEST, exception.getMessage(), exception.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(Exception exception) {
        return createProblemDetail(HttpStatusCode.valueOf(500), exception.getMessage(), "Unknown internal server error.");
    }

    private ProblemDetail createProblemDetail(HttpStatusCode status, String detail, String description) {
        ProblemDetail errorDetail = ProblemDetail.forStatusAndDetail(status, detail);
        errorDetail.setProperty("description", description);
        return errorDetail;
    }
}