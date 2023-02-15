import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, take } from 'rxjs';
import { Categories } from '../data/categories';
import { Price } from '../data/price';
import { Product } from '../data/product';
import { Shipment } from '../data/shipments';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])

  public creatingProduct = false;
  public categoryFilter = '';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
   this.updateProducts();
  }

  private showError(message: string): void {
    this._snackBar.open(message, undefined, { duration: 10000 })
  }

  getProducts() {
    return this.products.asObservable();
  }

  updateProducts() {
    this.http.get<Product[]>("http://localhost:8080/products")
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.products.next(products)
        },
        error: (error) => {
          this.showError("Failed to update products.")
        }
      })
  }

  createProduct(currentUser : User , name: string, available: Date, description: string, price: number, imageURL: string, category: Categories | null, MAP: number) {
    let product = new Product(name, true, available, description, imageURL, null, [], [], [], []);
    
    if (category)
      product.category = category

    product.scheduledPrices.push(new Price(null, price, available, null));
    product.scheduledMaps.push(new Price(null, MAP, available, null));

    let queryParams = new HttpParams();
    queryParams = queryParams.append("email", currentUser.email);
    queryParams = queryParams.append("password", currentUser.password);

    this.http.post("http://localhost:8080/products", product, { params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateProducts();
          this.creatingProduct = false;
        },
        error: (error) => {
          if(error.status === 400){
            this.showError("Product with id " + product.id + " already exists.")
          } else if (error.status === 412) {
            this.showError("The user does not have permissions to create products.")
          } else if (error.status === 304){
            this.showError("The user does not exist.")
          } else {
            this.showError("Error creating product.")
          }
        }
      })
  }

  deleteProduct(currentUser : User, product: Product | null) {
    if (product) {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("email", currentUser.email);
      queryParams = queryParams.append("password", currentUser.password);
      this.http.delete(`http://localhost:8080/products/${product.id}`, { params: queryParams })
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.updateProducts();
          },
          error: (error) => {
            if(error.status === 400){
              this.showError("User does not have permissions to delete products.")
            } else if (error.status === 404){
              this.showError("A product was not found with id " + product.id)
            } else {
              this.showError("Failed to delete product.")
            }
          }
        })
    }
  }

  updateProduct(product: Product, user: User) {
    this.http.put(`http://localhost:8080/products/${product.id}?email=${user.email}&password=${user.password}`, product)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateProducts();
        },
        error: (error) => {
          if(error.status === 401){
            this.showError("User does not have permissions to modify products.")
          } else if (error.status === 304){
            this.showError("A product with id " + product.id + " does not exist.")
          } else if (error.status === 404){
            this.showError("Cannot modify product. A new sale interferes with an existing one.")
          } else {
            this.showError("Failed to update product.")
          }
          this.updateProducts();
        }
      })
  }

  getDefaultPrice(product: Product): number {
    let defaultPrice = 0;
    const todayDate = new Date();

    let currPriceDate = new Date(product.availability) // start looping through dates at the date the item is available
    for (let price of product.scheduledPrices) {
      let priceDate = new Date(price.startDate)
      if (priceDate >= currPriceDate && priceDate <= todayDate) {
        defaultPrice = price.price; // update the product's default price for the current date
      }
    }
    return defaultPrice;
  }

  getCurrentPrice(product: Product): number {
    let defaultPrice = this.getDefaultPrice(product);
    const todayDate = new Date();

    // if a sale is going on, return the sale price
    for (let sale of product.scheduledSales) {
      let saleStartDate = new Date(sale.startDate)
      let saleEndDate = new Date()
      if(sale.endDate)
        saleEndDate = new Date(sale.endDate)
      if (saleStartDate <= todayDate && saleEndDate && saleEndDate > todayDate) {
        return sale.price
      }
    }
    return defaultPrice;
  }

  getCurrentMAP(product: Product): number {
    let defaultMAP = 0;
    const todayDate = new Date();

    let currMAPDate = new Date(product.availability) // start looping through MAPS at the date the item is available
    for (let MAP of product.scheduledMaps) {
      let mapDate = new Date(MAP.startDate)
      if (mapDate >= currMAPDate && mapDate <= todayDate) {
        currMAPDate = mapDate
        defaultMAP = MAP.price; // update the product's MAP for the current date
      }
    }
    return defaultMAP;
  }

  // returns the oldest shipment with inventory still available, or null if out of stock
  getCurrentShipment(product: Product): Shipment | null {
    let oldestShipment: Shipment | null = null;
    let oldestDate: Date = new Date("01/01/3000");
    const todayDate = new Date();

    // find the oldest shipment with positive quantity
    for (let shipment of product.shipments) {
      let shipDate = new Date(shipment.date)
      if ((oldestDate > shipDate) && (shipment.quantity > 0) && (shipDate <= todayDate)) {
        oldestDate = shipDate;
        oldestShipment = shipment;
        product.discontinued = false;
      }
    }
    return oldestShipment;
  }

  // updates the product's shipments and returns true if successful, else returns false if the product is out of stock

  attemptPurchase(product: Product, user: User) {
    let shipment = this.getCurrentShipment(product);
    if (shipment) {
      shipment.quantity--; // remove one of the products from the shipment
      if (shipment.quantity === 0 && this.getCurrentShipment(product) === null) {
        product.discontinued = true; // update the product to discontinued if there are no more shipments of it
      }

      this.updateProduct(product, user); // update the product now that its shipment has changed
      return true;
    } else {
      product.discontinued = true;
      return false;
    }
  }

  findLossError(product : Product): Product | null {
    console.log("Looking for error.")
    let errorProduct: Product | null = null
    let price = this.getCurrentPrice(product)
    let shipment = this.getCurrentShipment(product)
    if (shipment && shipment.cost > price) {
      errorProduct = product
    }
    return errorProduct;
  }

  findMAPError(product : Product): Product | null {
    let errorProduct: Product | null = null
    let price = this.getCurrentPrice(product)
    let MAP = this.getCurrentMAP(product)
    if (price < MAP) {
      errorProduct = product
    }
    return errorProduct;
  }

  setFilter(category: string) {this.categoryFilter = category}

}
