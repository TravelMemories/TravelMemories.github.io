package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Travel;
import sr.tm.repositories.TravelDAORepository;

import java.util.Objects;

@Transactional
@Service
public class TravelService {
    private TravelDAORepository travelDAORepository;

    @Autowired
    public TravelService(TravelDAORepository travelDAORepository){
        this.travelDAORepository = travelDAORepository;
    }

    public Page<Travel> getTravelsByUserEmail(String userEmail, Pageable pageable, String sort){
        if(userEmail == null){
            return travelDAORepository.findAll(pageable);
        }
        if(Objects.equals(sort, "latest")){
            return travelService.getTravelsByUserEmail(userEmail, pageRequest);
        }
        return travelService.getTravelsByUserEmail(userEmail, pageRequest);
    }
}
