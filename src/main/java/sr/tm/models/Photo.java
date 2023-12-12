package sr.tm.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "description")
    private String description;
    @Lob
    @Column(name = "photo_data")
    private byte[] photoData;

    @Column(name = "privacy")
    private Long privacy;

    @Column(name = "photo_date")
    private String photoDate;

    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;
}
