package net.yorksolutions.optumfsjavadukesofyork2.controllers;

import net.yorksolutions.optumfsjavadukesofyork2.models.Coupon;
import net.yorksolutions.optumfsjavadukesofyork2.services.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@RestController
@RequestMapping("/coupons")
@CrossOrigin
public class CouponController {
    private final CouponService service;

    @Autowired
    public CouponController(CouponService service) {
        this.service = service;
    }


    @PostMapping
    public ResponseEntity<Void> addNewCoupon(@RequestBody Coupon coupon) throws Exception {
        service.addNewCoupon(coupon);
        service.getCoupons();
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCoupon(@RequestBody Coupon coupon, @PathVariable Long id) throws Exception {
        try {
            service.deleteCoupon(id);
            service.addNewCoupon(coupon);
            service.getCoupons();
            return null;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping
    public Iterable<Coupon> getCoupons() {
        try {
            return service.getCoupons();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/code/{code}")
    public Optional<Coupon> getCouponInfoByCode(@PathVariable (required = false) String code) {
        try {
            return service.getCouponInfoByCode(code);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/{id}")
    public void deleteCoupon(@PathVariable Long id) {
        try {
            service.deleteCoupon(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


}
