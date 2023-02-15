package net.yorksolutions.optumfsjavadukesofyork2.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;


@Entity
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long id;

    public String code;
    public Long discount;
    public Long orderTotalMinimum;
    public LocalDate startDate;
    public LocalDate endDate;

}

