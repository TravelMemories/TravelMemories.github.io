package sr.tm.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column( name = "password_hash")
    private String passwordHash;

    @Column(name = "role")
    private String role;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Likes> likes = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Travel> travel = new HashSet<>();
}
