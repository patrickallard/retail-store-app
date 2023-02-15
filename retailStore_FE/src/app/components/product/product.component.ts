import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categories } from 'src/app/data/categories';
import { Price } from 'src/app/data/price';
import { Product } from 'src/app/data/product';
import { Shipment } from 'src/app/data/shipments';
import { AccountService } from 'src/app/services/account.service';
import { CartServiceService } from 'src/app/services/cart.service.service';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = new Product("",false,new Date(),"","",null,[],[],[],[]);

  public defaultPrice = 0;
  public currentPrice = 0;

  public todayDate = new Date();

  public name = ''
  public description = ''
  public price = 0
  public category : Categories | null = null
  public available = this.todayDate;
  public priceVal = 0;
  public dateVal = this.todayDate;
  public dateValEnd = this.todayDate;
  public shipQuantity = 0;
  public shipCost = 0;
  public imageURL = ''

  public edit = false;
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

  public priceColumns : string[] = ['price','startDate']
  public saleColumns : string[] = ['price','startDate','endDate']
  public shipColumns : string[] = ['quantity','cost','date']
  public pricesDs = new MatTableDataSource<Price>();
  public saleDs = new MatTableDataSource<Price>();
  public mapDs = new MatTableDataSource<Price>();
  public shipmentDs = new MatTableDataSource<Shipment>();

  constructor(public productService: ProductService, public accountService : AccountService, public cartService : CartServiceService, public ui : UiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.product){
      this.currentPrice = this.productService.getCurrentPrice(this.product);
      this.defaultPrice = this.productService.getDefaultPrice(this.product);
      this.pricesDs.data = this.product.scheduledPrices
      this.saleDs.data = this.product.scheduledSales
      this.mapDs.data = this.product.scheduledMaps
      this.shipmentDs.data = this.product.shipments
      this.productService.getCurrentShipment(this.product) // set the stock based on shipment quantity
    }
  }

  ngOnChange(): void {
    if(this.product){
      this.currentPrice = this.productService.getCurrentPrice(this.product);
      this.defaultPrice = this.productService.getDefaultPrice(this.product);
      this.pricesDs.data = this.product.scheduledPrices
      this.saleDs.data = this.product.scheduledSales
      this.mapDs.data = this.product.scheduledMaps
      this.shipmentDs.data = this.product.shipments
      this.productService.getCurrentShipment(this.product)
    }
  }

  openEditProduct(): void {
    let dialogRef = this.dialog.open(EditProductComponent, { width: '500px', data: this.product })

    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.productService.updateProduct(product, this.accountService.currentUser.getValue());
      } else {
        this.productService.updateProducts()
      }
    })
  }

  isAvailable() {
    const today = new Date();
    if (this.product)
      return new Date(this.product.availability) <= today
    else return false;
  }

}
