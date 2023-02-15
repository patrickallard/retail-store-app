package net.yorksolutions.optumfsjavadukesofyork2.services;

import net.yorksolutions.optumfsjavadukesofyork2.models.Coupon;
import net.yorksolutions.optumfsjavadukesofyork2.repositories.CouponRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CouponService {

    private final CouponRepository repository;

    public CouponService(CouponRepository couponRepository) {
        this.repository = couponRepository;
    }



    public void addNewCoupon(Coupon coupon) {
        repository.save(coupon);
    }

    public Iterable<Coupon> getCoupons() {
        return repository.findAll();
    }


    public Optional<Coupon> getCouponInfoByCode(String code) {
       return repository.findCouponByCode(code);
    }



    public void deleteCoupon(Long id) throws Exception {
        repository.deleteById(id);

    }






}
