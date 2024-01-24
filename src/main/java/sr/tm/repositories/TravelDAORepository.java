package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Travel;

public interface TravelDAORepository extends JpaRepository<Travel, Long> {
    public Page<Travel> findAllByUsernameOrderByTravelDateDesc(String username, Pageable pageable);
    public Page<Travel> findAllByUsernameOrderByTravelDateAsc(String username, Pageable pageable);
    public Page<Travel> findAllByOrderByTravelDateDesc(Pageable pageable);
    public Page<Travel> findAllByOrderByTravelDateAsc(Pageable pageable);
}

