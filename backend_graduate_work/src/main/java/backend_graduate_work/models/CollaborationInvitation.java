package backend_graduate_work.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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

    @Column(name = "accepted")
    private boolean accepted;

    @Column(name = "declined")
    private boolean declined;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;
}