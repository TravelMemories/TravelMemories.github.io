package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
    private final TravelDAORepository travelDAORepository;

    @Autowired
    public TravelService(TravelDAORepository travelDAORepository){
        this.travelDAORepository = travelDAORepository;
    }

    public Page<Travel> getTravelsByUsername(String username, Pageable pageable, String sort){
        if(username == null){
            if(Objects.equals(sort, "latest")){
                return travelDAORepository.findAllByOrderByTravelDateDesc(pageable);
            }
            return travelDAORepository.findAllByOrderByTravelDateAsc(pageable);
        }
        if(Objects.equals(sort, "latest")){
            return travelDAORepository.findAllByUsernameOrderByTravelDateDesc(username, pageable);
        }
        return travelDAORepository.findAllByUsernameOrderByTravelDateAsc(username, pageable);
    }
    public boolean deleteTravel(Long id) {
        try {
            travelDAORepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    public Travel save(Travel travel) {
        return travelDAORepository.save(travel);
    }
}