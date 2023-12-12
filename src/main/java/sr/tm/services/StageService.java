package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.repositories.StageDAORepository;

@Transactional
@Service
public class StageService {
    private StageDAORepository stageDAORepository;

    @Autowired
    public StageService(StageDAORepository stageDAORepository) {
        this.stageDAORepository = stageDAORepository;
    }
}
