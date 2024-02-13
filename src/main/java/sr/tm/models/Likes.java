package sr.tm.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonProperty("userId")
    @Column(name = "user_id")
    @Setter
    @Getter
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "photo_id", nullable = false)
    @JsonIgnore
    @Setter
    @Getter
    private Photo photo;
}
