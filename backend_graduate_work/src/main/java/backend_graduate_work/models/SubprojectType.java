package backend_graduate_work.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubprojectType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subtype_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ProjectType projectType;

    @Column(name = "name")
    private String name;
}
