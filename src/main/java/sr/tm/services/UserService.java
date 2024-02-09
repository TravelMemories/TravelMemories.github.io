package sr.tm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sr.tm.models.User;
import sr.tm.repositories.UserDAORepository;

@Service
@Transactional
public class UserService {
    private final UserDAORepository userDAORepository;

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

    public boolean checkPassword(String email, String password){
        return userDAORepository.checkPassword(email, password) == 1;
    }

    public boolean updatePasswordHashForUser(String email, String newPasswordHash){
        return userDAORepository.updatePasswordHashForUser(email, newPasswordHash) == 1;
    }
    public Page<User> getUserByEmail(String email, Pageable pageable) {
        return userDAORepository.findByEmail(email, pageable);
    }
}
