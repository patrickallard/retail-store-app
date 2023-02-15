package net.yorksolutions.optumfsjavadukesofyork2.services;

import net.yorksolutions.optumfsjavadukesofyork2.models.Price;
import net.yorksolutions.optumfsjavadukesofyork2.models.Product;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.AppUserRepository;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.PriceRepository;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final AppUserRepository appUserRepository;
    private final PriceRepository priceRepository;

    public ProductService(ProductRepository productRepository, PriceRepository priceRepository, AppUserRepository appUserRepository) {
        this.productRepository = productRepository;
        this.priceRepository = priceRepository;
        this.appUserRepository = appUserRepository;
    }

    public Iterable<Product> getAllProducts() {
        return productRepository.findByOrderByName();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    public void createProduct(Product requestProduct, String email, String password) throws Exception {
        final var client = appUserRepository.findAppUserByEmailAndPassword(email, password).orElseThrow();
        if(client.role != 1){
            throw new IllegalArgumentException();
        }

        // ensure the product id does not already exist
        if(requestProduct.id != null) {
            var product = productRepository.findById(requestProduct.id);
            if (product.isPresent()) {
                throw new IllegalStateException();
            }
        }
        productRepository.save(requestProduct);
    }

    public void updateProduct(Long id, Product requestProduct, String email, String password) throws Exception{
        final var client = appUserRepository.findAppUserByEmailAndPassword(email, password).orElseThrow();

        if(client.role == 2){
            throw new IllegalArgumentException();
        }

        // ensure the product id exists
        if(requestProduct.id != null) {
            var product = productRepository.findById(requestProduct.id);
            if (product.isEmpty()) {
                throw new IllegalStateException();
            }
        }

        // ensure none of the sales overlap
        for (var sale : requestProduct.scheduledSales){
            for (var sale2 : requestProduct.scheduledSales) {
                if ((sale.startDate.isBefore(sale2.startDate) && sale.endDate.isAfter(sale2.startDate)) || (sale.startDate.isBefore(sale2.endDate) && sale.endDate.isAfter(sale2.endDate))) {
                    throw new IllegalAccessException();
                }
            }
        }

        Product newProduct = new Product();
        copy(requestProduct, newProduct);

        Collections.sort(newProduct.scheduledMaps);
        Collections.sort(newProduct.scheduledPrices);
        Collections.sort(newProduct.scheduledSales);
        Collections.sort(newProduct.shipments);

        productRepository.save(newProduct);
    }

    public void deleteProduct(Long id, String email, String password) {
        final var client = appUserRepository.findAppUserByEmailAndPassword(email, password).orElseThrow();
        if(client.role != 1){
            throw new IllegalArgumentException();
        }
        productRepository.findById(id).orElseThrow();
        productRepository.deleteById(id);
    }

    // copies fields in arg 1 to fields in arg 2
    private void copy(Product requestProduct, Product updateProduct) {
        updateProduct.id = requestProduct.id;
        updateProduct.name = requestProduct.name;
        updateProduct.category = requestProduct.category;
        updateProduct.availability = requestProduct.availability;
        updateProduct.description = requestProduct.description;
        updateProduct.discontinued = requestProduct.discontinued;
        updateProduct.image = requestProduct.image;
        updateProduct.scheduledMaps = requestProduct.scheduledMaps;
        updateProduct.scheduledPrices = requestProduct.scheduledPrices;
        updateProduct.scheduledSales = requestProduct.scheduledSales;
        updateProduct.shipments = requestProduct.shipments;
    }
}
