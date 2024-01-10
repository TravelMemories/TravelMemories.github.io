package sr.tm.models;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column( name = "password_hash")
    private String passwordHash;

    @Column(name = "role")
    private String role;
}
