package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Travel;
import sr.tm.repositories.TravelDAORepository;

@Transactional
@Service
public class TravelService {
    private TravelDAORepository travelDAORepository;

    @Autowired
    public TravelService(TravelDAORepository travelDAORepository){
        this.travelDAORepository = travelDAORepository;
    }

    public Page<Travel> getTravelsByUserEmail(String userEmail, Pageable pageable){
        if(userEmail == null){
            return travelDAORepository.findAll(pageable);
        }
        return travelDAORepository.findAllByUserEmail(userEmail, pageable);
    }
}
