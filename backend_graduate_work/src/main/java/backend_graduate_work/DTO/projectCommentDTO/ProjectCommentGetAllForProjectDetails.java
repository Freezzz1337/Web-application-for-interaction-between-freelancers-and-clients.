package backend_graduate_work.DTO.projectCommentDTO;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Builder
public class ProjectCommentGetAllForProjectDetails {
    private String commentText;
    private BigDecimal budget;
    private Timestamp createdAt;

    private String userName;
    private long userId;
    @Lob
    private byte[] profilePicture;
}