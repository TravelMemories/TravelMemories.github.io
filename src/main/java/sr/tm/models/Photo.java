package sr.tm.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import sr.tm.BlobSerializer;

import java.sql.Blob;
import java.util.HashSet;
import java.util.Set;

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
    //@JsonSerialize(using = BlobSerializer.class)
    @Lob
    @Column(name = "photo_data")
    private byte[] photoData;

    @Column(name = "privacy")
    private Long privacy;

    @Column(name = "photo_date")
    private String photoDate;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "location_name")
    private String locationName;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;

    //@JsonIgnore
    @OneToMany(mappedBy = "photo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Likes> likes = new HashSet<>();
}
