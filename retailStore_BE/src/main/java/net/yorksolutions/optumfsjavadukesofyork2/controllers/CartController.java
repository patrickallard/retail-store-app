package net.yorksolutions.optumfsjavadukesofyork2.controllers;

import net.yorksolutions.optumfsjavadukesofyork2.models.Cart;
import net.yorksolutions.optumfsjavadukesofyork2.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {

    private  final CartService service;

    @Autowired
    public CartController(CartService service) { this.service = service; }

    /*
    @GetMapping
    public Iterable<Cart> getAllCarts() {
        return service.getAllCarts();
    }

     */
    @GetMapping
    public Cart getACart (@RequestParam Long userId) {
        try {
            return service.getACart(userId);
        } catch (Exception e) {
            throw new ResponseStatusException((HttpStatus.NOT_FOUND));
        }
    }

    @PostMapping
    public Cart addNewCart (@RequestBody Cart cart) {
        try{
            return service.addNewCart(cart);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public Cart updateCart (@RequestBody Cart cart) {
        try {
            return service.updateCart(cart);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}")
    public void deleteCart(@PathVariable Long userId) {
        try {
            service.deleteCart(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }

}
