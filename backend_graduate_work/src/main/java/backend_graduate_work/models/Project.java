package backend_graduate_work.models;

import backend_graduate_work.models.enums.PaymentStatusProject;
import backend_graduate_work.models.enums.StatusProject;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "budget", precision = 10, scale = 2)
    private BigDecimal budget;

    @Column(name = "deadline")
    private Timestamp deadline;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private User employer;

    @ManyToOne
    @JoinColumn(name = "freelancer_id")
    private User freelancer;

    @ManyToOne
    @JoinColumn(name = "subtype_id")
    private SubprojectType subprojectType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusProject status = StatusProject.OPEN;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatusProject paymentStatus = PaymentStatusProject.PENDING;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
