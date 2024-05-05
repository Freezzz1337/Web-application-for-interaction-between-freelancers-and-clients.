package backend_graduate_work.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "freelancer_id")
    private User user;

    @Lob
    @Column(name = "comment_text", columnDefinition = "LONGTEXT")
    private String commentText;

    @Column(name = "proposed_price", precision = 10, scale = 2)
    private BigDecimal budget;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
}
