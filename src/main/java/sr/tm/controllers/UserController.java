package sr.tm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sr.tm.models.User;
import sr.tm.services.UserService;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping( value = "/api")
@CrossOrigin("http://localhost:3000")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/user/checkPassword")
    public ResponseEntity<Page<User>> checkPassword(
            @RequestParam(name = "email") String email,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "pageSize", defaultValue = "20") int pageSize){

        PageRequest pageRequest = PageRequest.of(page, pageSize);
        Page<User> user = userService.getUserByEmail(email,pageRequest);
        boolean passwordMatch = userService.checkPassword(email, password);
        if (user != null && userService.checkPassword(email, password)) {
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(userService.getUserByEmail(null,pageRequest));
        }
    }

    @PostMapping("/user/changePassword")
    public ResponseEntity<String> changePassword(
            @RequestParam(name = "email") String email,
            @RequestParam(name = "newPassword") String newPassword){
        boolean passwordChanged = userService.updatePasswordHashForUser(email, newPassword);
        if(passwordChanged){
            return ResponseEntity.ok("Password has been changed.");
        } else{
            return ResponseEntity.badRequest().body("Something went wrong.");
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
