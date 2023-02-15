package net.yorksolutions.optumfsjavadukesofyork2.services;

import net.yorksolutions.optumfsjavadukesofyork2.models.Category;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {
    final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category create(Category categoryRequest) {
        return this.categoryRepository.save(categoryRequest);
    }

    public Iterable<Category> findByOrderByName(){
        return categoryRepository.findByOrderByName();
    }

    public void modifyCategory(Long id, Category category) throws Exception {
        Optional<Category> categoryOptional = categoryRepository.findCategoryById(id);
        if(categoryOptional.isEmpty()) {
            throw new Exception();
        }
        category.id = id;
        categoryRepository.save(category);
    }

    public void delete(Long id) throws Exception {
        Optional<Category> categoryOptional = this.categoryRepository.findCategoryById(id);
        if (categoryOptional.isEmpty()) {
            throw new Exception();
        }
        categoryRepository.delete(categoryOptional.get());

    }
}
