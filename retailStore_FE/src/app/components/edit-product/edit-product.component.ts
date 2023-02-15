import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from 'src/app/data/categories';
import { Price } from 'src/app/data/price';
import { Product } from 'src/app/data/product';
import { Shipment } from 'src/app/data/shipments';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  public todayDate = new Date();

  public name = ''
  public description = ''
  public price = 0
  public category: Categories | null = null
  public available = this.todayDate;
  public priceVal = 0;
  public dateVal = this.todayDate;
  public dateValEnd = this.todayDate;
  public shipQuantity = 0;
  public shipCost = 0;
  public imageURL = ''

  public changeName = false;
  public changeDesc = false;
  public changePrice = false;
  public changeAvail = false;
  public schedMAP = false;
  public schedPrice = false;
  public schedSale = false;
  public addShip = false;
  public addIm = false;
  public addCat = false;

  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product, public productService: ProductService, public ui: UiService
  ) {
  }

  resetVals() {
    this.changeName = false;
    this.changeDesc = false;
    this.changePrice = false;
    this.changeAvail = false;
    this.schedMAP = false;
    this.schedPrice = false;
    this.schedSale = false;
    this.addShip = false;
    this.addIm = false;
    this.addCat = false;
  }

  updateName() {
    if (this.data) {
      this.data.name = this.name;
      this.changeName = false;
    }
  }

  updateDescription() {
    if (this.data) {
      this.data.description = this.description;
      this.changeDesc = false;
    }
  }

  updateAvail() {
    if (this.data) {
      const oldAvailabilityDate = new Date(this.data.availability);
      this.data.availability = this.available;

      // find the price linked to the old availability date and update the price's start date
      for (let price of this.data.scheduledPrices) {
        let priceDate = new Date(price.startDate)
        if (priceDate === oldAvailabilityDate) {
          price.startDate = this.available
        }
      }
      this.changeAvail = false;
    }
  }

  addCategory(category: Categories | null) {
    if (this.data)
      this.data.category = category
    this.addCat = false;
  }

  addImage() {
    if (this.data)
      this.data.image = this.imageURL
    this.addIm = false;
  }

  addScheduledMAP() {
    if (this.data) {
      this.data.scheduledMaps.push(new Price(null, this.priceVal, this.dateVal, null))
      this.schedMAP = false;
      this.priceVal = 0;
      this.dateVal = this.todayDate;
    }
  }

  addScheduledPrice() {
    if (this.data) {
      this.data.scheduledPrices.push(new Price(null, this.priceVal, this.dateVal, null));
      this.schedPrice = false;
      this.priceVal = 0;
      this.dateVal = this.todayDate;
    }
  }

  addScheduledSale() {
    if (this.data) {
      this.data.scheduledSales.push(new Price(null, this.priceVal, this.dateVal, this.dateValEnd));
      this.schedSale = false;
      this.priceVal = 0;
      this.dateVal = this.todayDate;
      this.dateValEnd = this.todayDate;
    }
  }

  addShipment() {
    if (this.data) {
      if (this.data.id)
        this.data.shipments.push(new Shipment(this.data.id, this.shipQuantity, this.shipCost / this.shipQuantity, this.dateVal));
    }
    this.dateVal = this.todayDate;
    this.addShip = false;
  }

  discontinueItem() {
    if (this.data)
      this.data.discontinued = true;
  }

  rereleaseItem() {
    if (this.data)
      this.data.discontinued = false;
  }

  cancel() {
    this.dialogRef.close()
  }

}
