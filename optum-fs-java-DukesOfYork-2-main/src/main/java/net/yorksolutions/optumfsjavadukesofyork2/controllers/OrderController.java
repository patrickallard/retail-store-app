package net.yorksolutions.optumfsjavadukesofyork2.controllers;

import net.yorksolutions.optumfsjavadukesofyork2.dto.OrdersRequest;
import net.yorksolutions.optumfsjavadukesofyork2.models.CustomerOrder;
import net.yorksolutions.optumfsjavadukesofyork2.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
    private final OrderService service;
    @Autowired
    public OrderController(OrderService service) {
        this.service = service;
    }


    @PostMapping
    public ResponseEntity<Void> addNewOrder(@RequestBody CustomerOrder customerOrder) throws Exception {
        service.addNewOrder(customerOrder);
        //service.getOrders();
        return null;
    }


    @GetMapping
    public Iterable<OrdersRequest> getOrders() {
        try {
        return service.getOrders();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/{id}")
    public Optional<CustomerOrder> getOrderInfoById(@PathVariable (required = false) Long id) {
        try {
        return service.getOrderInfoById(id);
    } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}

    @GetMapping("/user/{email}")
    public Optional<CustomerOrder> getOrderInfoByEmail(@PathVariable (required = false) String email) {
        try {
            return service.getOrderInfoByEmail(email);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
            try {
        service.deleteOrder(id);
    } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
 }


}
