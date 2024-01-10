package sr.tm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sr.tm.models.User;

public interface UserDAORepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT COUNT(*) FROM User WHERE username = :username AND password_hash = :password", nativeQuery = true)
    public int checkPassword(@Param("username") String username, @Param("password") String password);
}

