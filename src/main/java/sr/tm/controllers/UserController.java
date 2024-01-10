package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.User;
import sr.tm.services.UserService;

@Controller
@RequestMapping( value = "/api")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/user/checkPassword")
    public ResponseEntity<String> checkPassword(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password) {

        boolean passwordMatch = userService.checkPassword(username, password);

        if (passwordMatch) {
            return ResponseEntity.ok("Password is correct.");
        } else {
            return ResponseEntity.badRequest().body("Password is incorrect.");
        }
    }

    @DeleteMapping("user/delete")
    public ResponseEntity<String> deleteUser(@RequestParam(name = "id") Long id){
        boolean deleteSuccessful = userService.delete(id);
        if(deleteSuccessful){
            return ResponseEntity.ok("User deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found or delete unsuccessful.");
    }

    @PutMapping("user/create")
    public ResponseEntity<User> createNewUser(@RequestBody User user){
        User addedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedUser);

    }

}
