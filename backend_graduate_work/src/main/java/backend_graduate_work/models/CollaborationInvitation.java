package backend_graduate_work.models;

import backend_graduate_work.models.enums.InvitationStatus;
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
public class CollaborationInvitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invitation_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private User employer;

    @ManyToOne
    @JoinColumn(name = "freelancer_id")
    private User freelancer;

    @CreationTimestamp
    @Column(name = "invitation_sent_at")
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @Column(name = "original_budget")
    private BigDecimal originalBudget;

    @Column(name = "original_deadline")
    private Timestamp originalDeadline;

    @Column(name = "new_budget")
    private BigDecimal newBudget;

    @Column(name = "new_deadline")
    private Timestamp newDeadline;

    @Enumerated(EnumType.STRING)
    @Column(name = "invitation_status")
    private InvitationStatus status;
}