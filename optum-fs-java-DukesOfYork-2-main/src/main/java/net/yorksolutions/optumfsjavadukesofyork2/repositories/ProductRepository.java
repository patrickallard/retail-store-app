package net.yorksolutions.optumfsjavadukesofyork2.repositories;

import net.yorksolutions.optumfsjavadukesofyork2.models.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    List<Product> findByOrderByName();

}
