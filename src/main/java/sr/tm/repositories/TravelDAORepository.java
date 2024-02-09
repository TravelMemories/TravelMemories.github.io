package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sr.tm.models.Travel;

import java.util.List;

public interface TravelDAORepository extends JpaRepository<Travel, Long> {
    public Page<Travel> findAllByUserIdOrderByTravelDateDesc(Long userId, Pageable pageable);
    public Page<Travel> findAllByUserIdOrderByTravelDateAsc(Long userId, Pageable pageable);
    public Page<Travel> findAllByIdOrderByTravelDateDesc(Long travelId,Pageable pageable);
    public Page<Travel> findAllByOrderByTravelDateDesc(Pageable pageable);
    public Page<Travel> findAllByOrderByTravelDateAsc(Pageable pageable);
    public Page<Travel> findAllByUserIdAndIdOrderByTravelDateDesc(Long userId, Long travelId, Pageable pageable);

    @Query(value = "SELECT DISTINCT t.* FROM travel t\n" +
            "JOIN stage s ON t.id = s.travel_id\n" +
            "JOIN photo p ON s.id = p.stage_id\n" +
            "WHERE p.privacy = 0\n" +
            "ORDER BY t.id;", nativeQuery = true)
    public List<Travel> travelsWithPublicPhotos();

}

