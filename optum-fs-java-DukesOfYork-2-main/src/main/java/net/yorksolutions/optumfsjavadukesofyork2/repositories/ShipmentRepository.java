package net.yorksolutions.optumfsjavadukesofyork2.repositories;

import net.yorksolutions.optumfsjavadukesofyork2.models.Shipment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ShipmentRepository extends CrudRepository<Shipment,Long> {



}
