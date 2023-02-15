import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coupon } from 'src/app/data/coupon';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css']
})
export class EditCouponComponent {
  constructor(public dialogRef: MatDialogRef<EditCouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Coupon,) { }


  cancel() {
    this.dialogRef.close()
  }
}
