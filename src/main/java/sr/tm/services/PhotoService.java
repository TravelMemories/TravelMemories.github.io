package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.repositories.PhotoDAORepository;

@Transactional
@Service
public class PhotoService {
    private PhotoDAORepository photoDAORepository;

    @Autowired
    public PhotoService(PhotoDAORepository photoDAORepository) {
        this.photoDAORepository = photoDAORepository;
    }
}
