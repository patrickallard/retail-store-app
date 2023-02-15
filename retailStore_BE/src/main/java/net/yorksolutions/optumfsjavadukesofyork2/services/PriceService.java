package net.yorksolutions.optumfsjavadukesofyork2.services;

import net.yorksolutions.optumfsjavadukesofyork2.models.Price;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.PriceRepository;
import org.springframework.stereotype.Service;

@Service
public class PriceService {

    final PriceRepository priceRepository;

    public PriceService(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    public Price create(Price priceRequest) { return this.priceRepository.save(priceRequest);}
}
