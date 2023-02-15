package net.yorksolutions.optumfsjavadukesofyork2.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Any;
import org.hibernate.annotations.ManyToAny;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    // Discuss which userid will be used for guest customers
    public String email;
    public LocalDate date;
    public Long orderTotal;
    public String products;

    /*
    @ManyToMany
    public List<Product> products;

     */

}
