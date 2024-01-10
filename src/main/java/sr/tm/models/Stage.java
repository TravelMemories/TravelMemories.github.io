package sr.tm.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "stage_date")
    private String stageDate;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "travel_id")
    private Travel travel;


    @OneToMany(mappedBy = "stage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos;

}
