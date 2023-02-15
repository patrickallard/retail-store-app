package net.yorksolutions.optumfsjavadukesofyork2.repositories;

import net.yorksolutions.optumfsjavadukesofyork2.models.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
  Optional<Cart> findCartByUserId(Long userId);
}
