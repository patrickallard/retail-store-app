import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Coupon } from '../data/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  public showMarquee: boolean = false
  public couponSubject: BehaviorSubject<Coupon[]> = new BehaviorSubject<Coupon[]>([])

  constructor(private http:HttpClient, private _snackBar: MatSnackBar) { 
    this.updateCoupons()

  }

  //GET
  updateCoupons(): void {
    this.http.get<Coupon[]>('http://localhost:8080/coupons')
      .pipe(take(1))
      .subscribe({
        next: (coupons) => this.couponSubject.next(coupons),
        error: (err) => this.showError("Error getting categories")
      })
  }
  // PUT
  updateCoupon(updatedCouponDetails: Coupon): void {
    this.http.put(`http://localhost:8080/coupons/${updatedCouponDetails.id}`, updatedCouponDetails)
      .pipe(take(1))
      .subscribe({
        next: () => this.updateCoupons(),
        error: (err) => this.showError("Error updating coupons")
      })
  }
  // POST
  createCoupon(newCoupon: Coupon): void {
    this.http.post('http://localhost:8080/coupons',newCoupon) 
      .pipe(take(1))
      .subscribe({
        next: () => this.updateCoupons(),
        error: (err) => this.showError("Error creating coupon") 
      })
  }
  // DELETE
  deleteCoupon(couponId: Number): void {
    this.http.delete(`http://localhost:8080/coupons/${couponId}`)
    .pipe(take(1))
    .subscribe({
      next: () => this.updateCoupons(),
      error: (err) => this.showError(`Error deleting coupon ${couponId}`)
    })
  }

  getCoupons(): Observable<Coupon[]> {
    return this.couponSubject.asObservable()
  }

  public showError(message: string): void {
    this._snackBar.open(message, undefined, {duration: 10000})
  }


}
