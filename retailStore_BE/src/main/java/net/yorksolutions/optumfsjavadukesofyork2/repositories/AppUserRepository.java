package net.yorksolutions.optumfsjavadukesofyork2.repositories;

import net.yorksolutions.optumfsjavadukesofyork2.models.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface AppUserRepository extends CrudRepository<AppUser,Long> {
    Optional<AppUser> findAppUserByEmailAndPassword(String email, String password);
    Optional<AppUser> findAppUserByEmail(String email);
}
