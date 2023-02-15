import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Coupon } from 'src/app/data/coupon';
import { CouponsService } from 'src/app/services/coupons.service';
import { UiService } from 'src/app/services/ui.service';
import { CreateCouponComponent } from '../create-coupon/create-coupon.component';
import { EditCouponComponent } from '../edit-coupon/edit-coupon.component';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnDestroy {
  public newCoupon: Coupon = new Coupon(-1, '', 0, 0, new Date(), new Date())
  public dataSource: MatTableDataSource<Coupon> = new MatTableDataSource<Coupon>([])
  public columnsToDisplay = ['id', 'code', 'discount', 'orderTotalMinimum', 'startDate', 'endDate', 'actions']
  public couponSub: Subscription

  constructor(public ui: UiService, public couponService: CouponsService, public dialog: MatDialog) {
    this.couponSub = this.couponService.getCoupons()
      .subscribe(coupons => this.dataSource.data = coupons)
  }

  ngOnDestroy() {
    this.couponSub.unsubscribe()
  }

  deleteCoupon(couponId: number) {
    this.couponService.deleteCoupon(couponId)
  }

  openCreateDialog(): void {
    let dialogRef = this.dialog.open(CreateCouponComponent, { width: '500px', data: this.newCoupon })

    dialogRef.afterClosed().subscribe(coupon => {
      if (coupon !== undefined) {
        this.newCoupon = coupon
        this.couponService.createCoupon(this.newCoupon)
      }
    })
  }
  openEditDialog(editCoupon: Coupon): void {
    let dialogRef = this.dialog.open(EditCouponComponent, { width: '400px', data: editCoupon})

    dialogRef.afterClosed().subscribe(coupon => {
      if (coupon !== undefined) {
        this.couponService.updateCoupon(coupon)
      }
    })
  }
}
