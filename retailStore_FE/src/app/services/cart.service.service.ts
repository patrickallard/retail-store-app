import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Input, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, Subscription, take } from 'rxjs';
import { Cart } from '../data/cart';
import { Product } from '../data/product';
import { User } from '../data/user';
import { AccountService } from './account.service';
import { CouponsService } from './coupons.service';
import { OrdersService } from './orders/orders.service';
import { ProductService } from './product.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnDestroy {

  //productList = new BehaviorSubject<any>([]);
  cartProductList: any[] = []
  currentUser: User = this.accountService.guestUser
  userSub: Subscription

  public cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(new Cart(Math.random(),-1,[]))

  constructor(private http: HttpClient, public accountService: AccountService, private productService: ProductService, private snackBar: MatSnackBar, private orderService : OrdersService) {
    this.http = http
    this.userSub = this.accountService.getCurrentUser().subscribe((user) => {this.currentUser = user; console.log("updated user", user); this.loadUserCart()})
  if(!this.accountService.isLoggedIn) {
      var cartString = localStorage.getItem("cart")
      if(cartString){
        var cart = JSON.parse(cartString)
        this.cartSubject.next(cart)
        console.log(this.cartSubject.value.products);
        
      }
    }
  }

  getCart(){
    return this.cartSubject.asObservable()
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
    }
  

  loadUserCart(): void {
    console.log("about to load a cart with user", this.currentUser)
    if(this.accountService.isLoggedIn && this.accountService.userIsCustomer()) {
    this.http.get<Cart>(`http://localhost:8080/cart?userId=${this.currentUser.id}`)
      .pipe(take(1))
      .subscribe({
        next: cart => {
          console.log(cart)
          this.cartSubject.next(cart)
        },
        error: (error) => {
          if(error.status === 404 && this.accountService.userIsCustomer()){
            let newCart = new Cart(null,this.accountService.currentUser.value.id,[])
            this.createCart(newCart)
          }
        }
      })
    }
    
  }

  updateCart(cart: Cart) {
    if(this.accountService.isLoggedIn) {
      this.http.put("http://localhost:8080/cart", cart)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loadUserCart()
          console.log("loaded cart from cartService.updateCart")
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
    
  }

  createCart(cart : Cart){
    this.http.post<Cart>("http://localhost:8080/cart", cart)
    .pipe(take(1))
    .subscribe({
      next: (cart)=> {
        this.cartSubject.next(cart)
      },
      error: (error) => {
        
      }
    })
  }

  //adding product to chart
  addToCart(product: Product) {

    for (let productInCart of this.cartSubject.value.products){
      if (productInCart.id === product.id){
        this.showError("Limit one of this product per purchase.")
        return;
      }
    }

    let cart = this.cartSubject.value
    console.log(cart.userId);
    
    cart.products.push(product)

    if (this.accountService.userIsCustomer()) {
      this.updateCart(cart)
    }
    else {
      this.cartSubject.next(cart)
      localStorage.setItem('cart',JSON.stringify(cart))
    }

  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartSubject.value.products.map((a: any) => {
      grandTotal += this.productService.getCurrentPrice(a);
    })
    return grandTotal;
  }

  removeCartProduct(product: Product) {
    let products = this.cartSubject.value.products
    products.splice(this.cartSubject.value.products.indexOf(product), 1)
    let cart = this.cartSubject.value
    cart.products = products
    localStorage.removeItem("cart")
    localStorage.setItem("cart",JSON.stringify(cart))
    this.cartSubject.next(cart)

    // this.cartSubject.value.products.splice(this.cartSubject.value.products.indexOf(product), 1)
  }

  //clear Cart if want
  removeAllCart() {
    let cart = this.cartSubject.value
    cart.products = []
    this.cartSubject.next(cart)
    this.updateCart(cart)
    localStorage.removeItem("cart")
  }

  checkout() {
    let cart = this.cartSubject.value

    for(let product of cart.products){
      let shipment = this.productService.getCurrentShipment(product)
      if(!shipment){
        this.showError("Sorry, one or more items is currently unavailable.")
        return;
      }
    }

    for(let product of cart.products){
      console.log(product)
      if(!this.productService.attemptPurchase(product, this.currentUser)){
        this.showError("Internal error.")
        return;
      }
    }

    let products = ''

    cart.products.map((p)=> {
      products += p.id + ','
    })

    let email = this.accountService.currentUser.value.email
    let orderDate = new Date()
    let orderTotal = this.getTotalPrice();

    this.orderService.addOrder(email,orderTotal,orderDate,products)

    this.removeAllCart();
  }

  //catch error message
  public showError(message: string): void {
    this.snackBar.open(message, undefined, { duration: 10000 })
  }

  logoutCart() {
    this.cartSubject.next(new Cart(Math.random(),-1,[]))
  }

}




