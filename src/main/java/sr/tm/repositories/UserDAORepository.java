package sr.tm.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.User;

public interface UserDAORepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT COUNT(*) FROM User WHERE email = :email AND password_hash = :password", nativeQuery = true)
    public int checkPassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Transactional
    @Query(value = "UPDATE User u SET u.passwordHash = :newPasswordHash WHERE u.email = :email")
    public int updatePasswordHashForUser(@Param("email") String email, @Param("newPasswordHash") String newPasswordHash);

    public Page<User> findByEmail(String email, Pageable pageable);
}

