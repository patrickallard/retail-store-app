package net.yorksolutions.optumfsjavadukesofyork2.dto;

import net.yorksolutions.optumfsjavadukesofyork2.models.Product;

import java.time.LocalDate;
import java.util.List;

public class OrdersRequest {

    public Long id;
    public String email;
    public LocalDate date;
    public Long orderTotal;
    public List<Product> products;
}
