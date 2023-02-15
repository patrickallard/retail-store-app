package net.yorksolutions.optumfsjavadukesofyork2.services;

import net.yorksolutions.optumfsjavadukesofyork2.models.Cart;

import net.yorksolutions.optumfsjavadukesofyork2.repositories.CartRepository;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;


    public CartService(CartRepository repository) {
        this.cartRepository  = repository;
    }

    // logics to fns

    public Iterable<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart getACart(Long userId) throws Exception {
        System.out.println("Starting service function.");
        System.out.println(userId);

        if (cartRepository.findCartByUserId(userId).isEmpty()) {
            System.out.println("Cart not found.");
            throw new Exception();
        }


        System.out.println("Looking for cart...");
        final var userCart = cartRepository.findCartByUserId(userId).orElseThrow();
        return userCart;
    }

    public Cart addNewCart(Cart cart) throws Exception {
        if (cartRepository.findCartByUserId(cart.userId).isPresent()) {
            throw new Exception("user already has a cart");
        }
        if(cart.id != null) {
            if (cartRepository.findById(cart.userId).isPresent())
                throw new Exception();
        }
        return cartRepository.save(cart);
    }

    public Cart updateCart(Cart cart) throws Exception {
        if (cartRepository.findCartByUserId(cart.userId).isEmpty())
            throw new Exception();
        final var updatedCart = cartRepository.findCartByUserId(cart.userId).orElseThrow();
        updatedCart.userId = cart.userId;
        updatedCart.products = cart.products;

        return cartRepository.save(updatedCart);
    }

    public void deleteCart(Long userId) throws Exception {
        Optional <Cart> cartToDelete = this.cartRepository.findById(userId);
        if (cartToDelete.isEmpty()) {
            throw new Exception();
        }

        cartRepository.deleteById(userId);
    }

}
