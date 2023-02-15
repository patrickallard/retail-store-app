package net.yorksolutions.optumfsjavadukesofyork2.controllers;

import net.yorksolutions.optumfsjavadukesofyork2.models.Category;
import net.yorksolutions.optumfsjavadukesofyork2.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {
    CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category create(@RequestBody Category categoryRequest) {
        return this.categoryService.create(categoryRequest);
    }

    @GetMapping
    public Iterable<Category> getCategories() {
        try {
            return categoryService.findByOrderByName();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public void modifyCategory(@PathVariable Long id, @RequestBody Category category) {
        try {
            categoryService.modifyCategory(id, category);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        try {
            this.categoryService.delete(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}
