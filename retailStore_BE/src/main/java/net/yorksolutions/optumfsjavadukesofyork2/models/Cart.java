package net.yorksolutions.optumfsjavadukesofyork2.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    public Long userId;


    @OneToMany
    public List<Product> products;


}
