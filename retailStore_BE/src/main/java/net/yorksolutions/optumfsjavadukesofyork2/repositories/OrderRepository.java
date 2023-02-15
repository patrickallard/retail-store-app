package net.yorksolutions.optumfsjavadukesofyork2.repositories;
import net.yorksolutions.optumfsjavadukesofyork2.models.CustomerOrder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends CrudRepository<CustomerOrder, Long> {
    Optional<CustomerOrder> getOrderInfoByEmail(String email);

}
