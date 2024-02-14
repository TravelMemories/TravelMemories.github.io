package sr.tm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import sr.tm.models.Photo;

public interface PhotoDAORepository extends JpaRepository<Photo, Long> {
    Page<Photo> findAllByPrivacyOrderByPhotoDateAsc(Long privacy, Pageable pageable);
    Page<Photo> findAllByPrivacyOrderByPhotoDateDesc(Long privacy, Pageable pageable);
    Page<Photo> findAllByStageIdAndPrivacyOrderByPhotoDateAsc(Long stage_id, Long privacy, Pageable pageable);
    Page<Photo> findAllByStageIdAndPrivacyOrderByPhotoDateDesc(Long stage_id, Long privacy, Pageable pageable);
    Page<Photo> findAllById(Long stage_id, Pageable pageable);

}
