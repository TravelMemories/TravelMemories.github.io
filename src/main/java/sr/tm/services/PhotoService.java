package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Photo;
import sr.tm.repositories.PhotoDAORepository;

import java.util.Optional;

@Transactional
@Service
public class PhotoService {
    private final PhotoDAORepository photoDAORepository;

    @Autowired
    public PhotoService(PhotoDAORepository photoDAORepository) {
        this.photoDAORepository = photoDAORepository;
    }
    public Page<Photo> getById(Long id, Pageable pageable ){
        return photoDAORepository.findAllById(id, pageable);
    }

    public Page<Photo> getAllPhotosByStageId(String stageId, Pageable pageable, String sort, Long privacy){
        if(sort.equals("latest")){
            if(stageId == null){
                return photoDAORepository.findAllByPrivacyOrderByPhotoDateDesc(privacy, pageable);
            } else{
                return photoDAORepository.findAllByStageIdAndPrivacyOrderByPhotoDateDesc(Long.valueOf(stageId), privacy, pageable);
            }
        } else {
            if(stageId == null){
                return photoDAORepository.findAllByPrivacyOrderByPhotoDateAsc(privacy, pageable);
            } else {
                return photoDAORepository.findAllByStageIdAndPrivacyOrderByPhotoDateAsc(Long.valueOf(stageId), privacy, pageable);
            }
        }
    }
    public Optional<Photo> getById(Long id){
        return photoDAORepository.findById(id);
    }
    public boolean deletePhoto(Long id){
        try{
            photoDAORepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e){
            return false;
        }
    }

    public Photo save(Photo photo){
        return photoDAORepository.save(photo);
    }
}
