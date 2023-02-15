package net.yorksolutions.optumfsjavadukesofyork2.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    public String name;
    @OneToOne
    public Category category;
    public LocalDate availability;
    public String description;
    public boolean discontinued;
    public String image;
    @OneToMany(cascade = CascadeType.ALL)
    public List<Price> scheduledMaps;
    @OneToMany(cascade = CascadeType.ALL)
    public List<Price> scheduledPrices;
    @OneToMany(cascade = CascadeType.ALL)
    public List<Price> scheduledSales;
    @OneToMany(cascade = CascadeType.ALL)
    public List<Shipment> shipments;

    @ManyToMany
    public List<CustomerOrder> orders;

    public Product(){}
}
