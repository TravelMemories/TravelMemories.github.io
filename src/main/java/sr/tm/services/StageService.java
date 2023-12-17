package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Stage;
import sr.tm.repositories.StageDAORepository;

@Transactional
@Service
public class StageService {
    private StageDAORepository stageDAORepository;

    @Autowired
    public StageService(StageDAORepository stageDAORepository) {
        this.stageDAORepository = stageDAORepository;
    }

    public Page<Stage> getAllStagesByUserEmail(String travelId, Pageable pageable, String sort) {
        if(sort.equals("latest")){
            if(travelId == null){
                return stageDAORepository.findAllByOrderByStageDateAsc(pageable);
            }
            return stageDAORepository.findAllByTravelIdOrderByStageDateAsc(travelId, pageable);
        } else {
            if(travelId == null){
                return stageDAORepository.findAllByOrderByStageDateDesc(pageable);
            }
            return stageDAORepository.findAllByTravelIdOrderByStageDateDesc(travelId, pageable);
        }
    }
}
