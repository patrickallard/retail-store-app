package net.yorksolutions.optumfsjavadukesofyork2.services;

import net.yorksolutions.optumfsjavadukesofyork2.models.AppUser;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.AppUserRepository;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }
    public AppUser create(AppUser appUserRequest) throws Exception {
        if (appUserRepository.findAppUserByEmail(appUserRequest.email).isPresent()) {
            throw new Exception("the email you entered is already associated with an existing account");
        }
        return this.appUserRepository.save(appUserRequest);
    }
    public Iterable<AppUser> getAllUsers(){
        return appUserRepository.findAll();
    }
    public AppUser checkCredentials(String email, String password) {
        return appUserRepository.findAppUserByEmailAndPassword(email, password).orElseThrow();
    }
    public AppUser modifyAppUser(Long id, AppUser appUser, String email, String password) throws Exception{
        final var target = appUserRepository.findById(id).orElseThrow();
        final var client = checkCredentials(email, password);
        // not admin and not the account owner
        if (!client.role.equals(2) && !client.id.equals(id)) {
            throw new Exception("customers and storekeepers can only edit their own accounts");
        }
        // account owner modifying their own role
        if (client.id.equals(id) && !client.role.equals(appUser.role)) {
            throw new Exception("users cannot change their own role");
        }
        // modifying email to one that already exists in the database
        if (!target.email.equals(appUser.email) && appUserRepository.findAppUserByEmail(appUser.email).isPresent()) {
            throw new Exception("the email you entered is already associated with an existing account");
        }
        appUser.id = id;
        return appUserRepository.save(appUser);
    }

    public void delete(Long id, String email, String password) throws Exception {
        final var client = checkCredentials(email, password);
        // admin and deleting their own account
        if (client.role.equals(2) && client.id.equals(id)) {
            throw new Exception("admin cannot delete their own account");
        }
        // not admin and not deleting their own account
        if (!client.role.equals(2) && !client.id.equals(id)) {
            throw new Exception("customers and storekeepers can only delete their own accounts");
        }
        appUserRepository.findById(id).orElseThrow();
        appUserRepository.deleteById(id);
    }
}
