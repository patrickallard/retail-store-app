package net.yorksolutions.optumfsjavadukesofyork2.repositories;

import net.yorksolutions.optumfsjavadukesofyork2.models.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    Optional<Category> findCategoryById(Long id);
    List<Category> findByOrderByName();
}
