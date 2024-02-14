package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.Travel;
import sr.tm.repositories.TravelDAORepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Transactional
@Service
public class TravelService {
    private final TravelDAORepository travelDAORepository;

    @Autowired
    public TravelService(TravelDAORepository travelDAORepository){
        this.travelDAORepository = travelDAORepository;
    }

    public Optional<Travel> getTravelById(Long travelId){
        return travelDAORepository.findById(travelId);
    }
    public Page<Travel> getTravelsById(Long travelId,Long userId, Pageable pageable, String sort){
        if(userId == null && travelId == null){
            if(Objects.equals(sort, "latest")){
                return travelDAORepository.findAllByOrderByTravelDateDesc(pageable);
            }
            return travelDAORepository.findAllByOrderByTravelDateAsc(pageable);
        }
        if(travelId != null){
                return travelDAORepository.findAllByIdOrderByTravelDateDesc(travelId, pageable);
        }

        if(Objects.equals(sort, "latest")){
            return travelDAORepository.findAllByUserIdOrderByTravelDateDesc(userId, pageable);
        }
        return travelDAORepository.findAllByUserIdOrderByTravelDateAsc(userId, pageable);

    }
    public List<Travel> getTravelsWithPublicPhotos(Pageable pageable) {
        return travelDAORepository.travelsWithPublicPhotos();
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
