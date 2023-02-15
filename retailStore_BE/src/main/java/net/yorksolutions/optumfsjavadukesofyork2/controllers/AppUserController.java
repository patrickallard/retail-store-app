package net.yorksolutions.optumfsjavadukesofyork2.controllers;

import net.yorksolutions.optumfsjavadukesofyork2.models.AppUser;
import net.yorksolutions.optumfsjavadukesofyork2.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class AppUserController {
    AppUserService appUserService;
@Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping
    public AppUser create(@RequestBody AppUser appUserRequest) {
    try {
        return this.appUserService.create(appUserRequest);
    } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
    }
    @GetMapping
    public Iterable<AppUser> getAllUsers() {
        try {
            return appUserService.getAllUsers();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(params = {"email","password"})
    public AppUser checkCredentials(@RequestParam String email, @RequestParam String password) {
        try {
            return appUserService.checkCredentials(email, password);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("/{id}")
        public AppUser modifyAppUser (@PathVariable Long id, @RequestBody AppUser appUser, @RequestParam String email, @RequestParam String password) {
        try {
            return appUserService.modifyAppUser(id, appUser, email, password);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, @RequestParam String email, @RequestParam String password) {
        try {
            this.appUserService.delete(id, email, password);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

}
