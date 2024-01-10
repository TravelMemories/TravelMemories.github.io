package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.User;
import sr.tm.repositories.UserDAORepository;

@Service
@Transactional
public class UserService {
    private UserDAORepository userDAORepository;

    @Autowired
    public UserService(UserDAORepository userDAORepository) {
        this.userDAORepository = userDAORepository;
    }

    public boolean delete(Long id) {
        try{
            this.userDAORepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e){
            return false;
        }
    }

    public User save(User user) {
        return this.userDAORepository.save(user);
    }

    public boolean checkPassword(String username, String password){
        return userDAORepository.checkPassword(username, password) == 1;
    }
}
