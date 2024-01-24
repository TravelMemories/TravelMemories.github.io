package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Photo;
import sr.tm.repositories.PhotoDAORepository;

@Transactional
@Service
public class PhotoService {
    private final PhotoDAORepository photoDAORepository;

    @Autowired
    public PhotoService(PhotoDAORepository photoDAORepository) {
        this.photoDAORepository = photoDAORepository;
    }

    public Page<Photo> getAllPhotosByStageId(String stageId, Pageable pageable, String sort){
        if(sort.equals("latest")){
            if(stageId == null){
                return photoDAORepository.findAllByOrderByPhotoDateDesc(pageable);
            } else{
                return photoDAORepository.findAllByStageIdOrderByPhotoDateDesc(stageId, pageable);
            }
        } else {
            if(stageId == null){
                return photoDAORepository.findAllByOrderByPhotoDateAsc(pageable);
            } else {
                return photoDAORepository.findAllByStageIdOrderByPhotoDateAsc(stageId, pageable);
            }
        }
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
