package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Stage;
import sr.tm.repositories.StageDAORepository;

import java.util.Optional;

@Transactional
@Service
public class StageService {
    private final StageDAORepository stageDAORepository;

    @Autowired
    public StageService(StageDAORepository stageDAORepository) {
        this.stageDAORepository = stageDAORepository;
    }

    public Optional<Stage> getById(Long stageId){
        return stageDAORepository.findById(stageId);
    }
    public Page<Stage> getAllStagesByUserEmail(String travelId, Pageable pageable, String sort) {
        if(sort.equals("latest")){
            if(travelId == null){
                return stageDAORepository.findAllByOrderByStageDateAsc(pageable);
            }
            return stageDAORepository.findAllByTravelIdOrderByStageDateAsc(Long.valueOf(travelId), pageable);
        } else {
            if(travelId == null){
                return stageDAORepository.findAllByOrderByStageDateDesc(pageable);
            }
            return stageDAORepository.findAllByTravelIdOrderByStageDateDesc(Long.valueOf(travelId), pageable);
        }
    }

    public boolean deleteStage(Long id){
        try{
            stageDAORepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e){
            return false;
        }
    }

    public Stage save(Stage stage){
        return stageDAORepository.save(stage);
    }
}
