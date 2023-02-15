package net.yorksolutions.optumfsjavadukesofyork2.controllers;

import net.yorksolutions.optumfsjavadukesofyork2.models.Price;
import net.yorksolutions.optumfsjavadukesofyork2.services.PriceService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/price")
@CrossOrigin
public class PriceController {

    PriceService priceService;

    public PriceController(PriceService priceService) {
        this.priceService = priceService;
    }

    @PostMapping
    public Price create(@RequestBody Price priceRequest) {
        return this.priceService.create(priceRequest);
    }
}
