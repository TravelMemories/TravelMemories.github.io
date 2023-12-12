package sr.tm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Stage;

public interface StageDAORepository extends JpaRepository<Stage, Long> {
}
