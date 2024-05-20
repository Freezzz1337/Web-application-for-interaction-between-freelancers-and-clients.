package backend_graduate_work.DTO.userDTO.UserProfileResponseDTO;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Builder
public class UserReview {
    private int rating;
    private String comment;
    private Timestamp reviewDate;

    private String employerName;

    private BigDecimal budget;
    private String projectName;
}
