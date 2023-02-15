package net.yorksolutions.optumfsjavadukesofyork2.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Price implements Comparable<Price>{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)

    public long id;
    public double price;
    public LocalDate startDate;
    public LocalDate endDate;

    @Override
    public int compareTo(Price price){
        return startDate.compareTo(price.startDate);
    }
}
