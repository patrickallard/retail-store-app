package net.yorksolutions.optumfsjavadukesofyork2.services;

import net.yorksolutions.optumfsjavadukesofyork2.dto.OrdersRequest;
import net.yorksolutions.optumfsjavadukesofyork2.models.CustomerOrder;
import net.yorksolutions.optumfsjavadukesofyork2.models.Product;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.OrderRepository;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.lang.Long.parseLong;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.repository = orderRepository;
        this.productRepository = productRepository;
    }


    public void addNewOrder(CustomerOrder customerOrder) {
    //    final var newProduct = new Product();
        repository.save(customerOrder);
    }

    public Iterable<OrdersRequest> getOrders() {
        List<OrdersRequest> ordersRequest = new ArrayList<>();

        for(var order : repository.findAll()){
            OrdersRequest newOrder = new OrdersRequest();
            newOrder.id = order.id;
            newOrder.date = order.date;
            newOrder.orderTotal = order.orderTotal;
            newOrder.email = order.email;

            //create list of products
            List<Product> newProducts = new ArrayList<Product>();

            String[] productsStrings = order.products.split(",");

            for (var id : productsStrings){
                newProducts.add(productRepository.findById(parseLong(id)).orElseThrow());
            }

            newOrder.products = newProducts;

            ordersRequest.add(newOrder);
        }

        return ordersRequest;
    }


    public Optional<CustomerOrder> getOrderInfoById(Long id) {
        return repository.findById(id);
    }


    public Optional<CustomerOrder> getOrderInfoByEmail(String email) {
        return repository.getOrderInfoByEmail(email);
    }




    public void deleteOrder(Long id) throws Exception {
        repository.deleteById(id);

    }






}
