package sr.tm.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "stage")
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "travel_id")
    private Travel travel;


    @OneToMany(mappedBy = "stage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos;

}
