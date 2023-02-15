package net.yorksolutions.optumfsjavadukesofyork2.controllers;

import net.yorksolutions.optumfsjavadukesofyork2.models.Product;
import net.yorksolutions.optumfsjavadukesofyork2.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    private Iterable<Product> getAllProducts() {
        try {
            return productService.getAllProducts();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/{id}")
    private Product getProductById(@PathVariable Long id) {
        try {
            return productService.getProductById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    private void createProduct(@RequestBody Product product, @RequestParam String email, @RequestParam String password) {
        try {
            productService.createProduct(product,email,password);
        } catch (IllegalStateException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_MODIFIED, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    private void updateProduct(@PathVariable Long id, @RequestBody Product product, @RequestParam String email, @RequestParam String password) {
        try {
            productService.updateProduct(id, product, email, password);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (IllegalStateException e){
            throw new ResponseStatusException(HttpStatus.NOT_MODIFIED);
        } catch (IllegalAccessException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.MULTI_STATUS);
        }
    }

    @DeleteMapping("/{id}")
    private void deleteProduct(@PathVariable Long id, @RequestParam String email, @RequestParam String password) {
        try {
            productService.deleteProduct(id, email, password);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
