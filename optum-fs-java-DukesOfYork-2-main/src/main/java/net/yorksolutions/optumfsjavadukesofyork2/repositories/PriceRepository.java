package net.yorksolutions.optumfsjavadukesofyork2.repositories;


import net.yorksolutions.optumfsjavadukesofyork2.models.Price;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceRepository extends CrudRepository<Price, Long> {
}
