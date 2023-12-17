package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Stage;

public interface StageDAORepository extends JpaRepository<Stage, Long> {
    Page<Stage> findAllByOrderByStageDateAsc(Pageable pageable);
    Page<Stage> findAllByOrderByStageDateDesc(Pageable pageable);
    Page<Stage> findAllByTravelIdOrderByStageDateAsc(String travelId, Pageable pageable);

    Page<Stage> findAllByTravelIdOrderByStageDateDesc(String travelId, Pageable pageable);
}
