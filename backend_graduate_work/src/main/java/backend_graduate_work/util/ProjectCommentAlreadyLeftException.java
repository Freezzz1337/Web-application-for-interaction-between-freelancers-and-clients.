package backend_graduate_work.util;

public class ProjectCommentAlreadyLeftException extends RuntimeException{
    public ProjectCommentAlreadyLeftException (){
        super("You have already left a comment");
    }
}
