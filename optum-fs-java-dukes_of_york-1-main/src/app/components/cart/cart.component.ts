import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cart } from 'src/app/data/cart';
import { Product } from 'src/app/data/product';
import { AccountService } from 'src/app/services/account.service';
import { CartServiceService } from 'src/app/services/cart.service.service';
import { CouponsService } from 'src/app/services/coupons.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  // Cart data
  // public id: number,
  // public UserId: number,
  // public products: Product[]

  public products: Product[] = [];
  public grandTotal: number = 0;
  couponCode = ''

  couponApplied = false

  cartData !: MatTableDataSource<Cart>

  post: any

  constructor(public cartService: CartServiceService,
    public ui: UiService,
    public orderServces: OrdersService,
    public productService: ProductService,
    public couponService: CouponsService,
    public accountService: AccountService
  ) {
    
    cartService.cartSubject.subscribe((cart) => {
      this.products = cart.products
      this.grandTotal = this.cartService.getTotalPrice()
    })
    
    /*
    accountService.currentUser.subscribe((user) => {
      // if(accountService.userIsGuest()){
      //   // set cart back to empty or load from local storage
      //   cartService.logoutCart()
      if (accountService.userIsCustomer()){
        // get user cart from cartService db
        cartService.loadUserCart();
        console.log("load cart from cart component constructor")
      }
    })
    */
    
  }

  /*
    ngOnInit(): void {
      this.cartService.getProducts()
        .subscribe(x => {
          this.products = x;
        });
  
      for (const product of this.products) {
        this.grandTotal = - this.productService.getCurrentPrice(product);
      }
    }
    */

  checkCode() {
    let couponFound = null
    for (let coupon of this.couponService.couponSubject.value) {
      if (this.couponCode === coupon.code) {
        couponFound = coupon
      }
    }
    if (couponFound) {
      if (this.grandTotal >= couponFound.orderTotalMinimum) {
        this.couponApplied = true;
        this.grandTotal = this.grandTotal - couponFound.discount;
      }

    }
  }

  getProducts() {
    this.products = this.cartService.cartSubject.value.products
    console.log(this.products);
    
    this.grandTotal = this.cartService.getTotalPrice()
    if (this.couponCode != '') {
      this.checkCode()
    }
    return true;
  }

  getCart() {
    this.cartService.loadUserCart()
    console.log("loaded cart from cartComponent.getCart")
  }

}





