package sr.tm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Photo;

public interface PhotoDAORepository extends JpaRepository<Photo, Long> {
}
