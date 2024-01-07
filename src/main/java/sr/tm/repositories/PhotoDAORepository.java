package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Photo;

public interface PhotoDAORepository extends JpaRepository<Photo, Long> {
    Page<Photo> findAllByOrderByPhotoDateAsc(Pageable pageable);
    Page<Photo> findAllByOrderByPhotoDateDesc(Pageable pageable);
    Page<Photo> findAllByStageIdOrderByPhotoDateAsc(String stageId, Pageable pageable);
    Page<Photo> findAllByStageIdOrderByPhotoDateDesc(String stageId, Pageable pageable);
}
