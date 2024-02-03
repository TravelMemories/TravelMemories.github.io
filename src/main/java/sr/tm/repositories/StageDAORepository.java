package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Stage;

public interface StageDAORepository extends JpaRepository<Stage, Long> {
    Page<Stage> findAllByOrderByStageDateAsc(Pageable pageable);
    Page<Stage> findAllByOrderByStageDateDesc(Pageable pageable);
    Page<Stage> findAllByTravelIdOrderByStageDateAsc(Long travel_id, Pageable pageable);
    Page<Stage> findAllByTravelIdOrderByStageDateDesc(Long travel_id, Pageable pageable);
}
