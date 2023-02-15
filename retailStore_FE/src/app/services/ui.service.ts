import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Categories } from '../data/categories';
import { Product } from '../data/product';
import { CartServiceService } from './cart.service.service';
import { AccountService } from './account.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {


  public displayCategories: boolean = false
  public displayProducts: boolean = true;
  public displayCart: boolean = false;
  public displayOrders: boolean = false;
  public displayAccount: boolean = false;
  public displayLogin: boolean = false;
  public displayRegister: boolean = false;
  public displayCoupons: boolean = false;
  public displayProfileEdit: boolean = false;

  public categorySubject: BehaviorSubject<Categories[]> = new BehaviorSubject<Categories[]>([])

  constructor(private http: HttpClient, private productService : ProductService, private _snackBar: MatSnackBar) {
    // Real function for populating categories
     this.updateCategories()
  }

  resetValues() {
    this.displayAccount = false;
    this.displayCategories = false;
    this.displayCart = false;
    this.displayOrders = false;
    this.displayProducts = false;
    this.displayLogin = false;
    this.displayRegister = false;
    this.displayCoupons = false;
    this.displayProfileEdit = false;
    this.productService.setFilter('');
    this.productService.updateProducts();
  }

  showCart() {
    this.resetValues();
    this.displayCart = true;
  }

  showAccount() {
    this.resetValues();
    this.displayAccount = true;
  }

  showCategories() {
    this.resetValues();
    this.displayCategories = true;
  }

  showProducts() {
    this.resetValues();
    this.displayProducts = true;
  }

  showOrders() {
    this.resetValues();
    this.displayOrders = true;
  }

  showLogin() {
    this.resetValues();
    this.displayLogin = true;
  }

  showRegister() {
    this.resetValues();
    this.displayRegister = true;
  }

  showCoupons() {
    this.resetValues();
    this.displayCoupons = true;
    }

  // GET
  updateCategories(): void {
    this.http.get<Categories[]>('http://localhost:8080/category')
      .pipe(take(1))
      .subscribe({
        next: (categories) => this.categorySubject.next(categories),
        error: (err) => this.showError("Error getting categories")
      })
  }
  // PUT
  updateCategory(updatedCategory: Categories): void {
    this.http.put(`http://localhost:8080/category/${updatedCategory.id}`, updatedCategory)
      .pipe(take(1))
      .subscribe({
        next: () => this.updateCategories(),
        error: (err) => this.showError("Error updating category")
      })
  }
  // POST
  createCategory(newCategory: Categories): void {
    this.http.post('http://localhost:8080/category', newCategory)
      .pipe(take(1))
      .subscribe({
        next: () => this.updateCategories(),
        error: (err) => this.showError("Error creating category")
      })
  }
  // DELETE
  deleteCategory(categoryId: Number): void {
    this.http.delete(`http://localhost:8080/category/${categoryId}`)
      .pipe(take(1))
      .subscribe({
        next: () => this.updateCategories(),
        error: (err) => {
          if(err.status === 404){
            this.showError("Category is tied to current products.")
          } else {
            this.showError(`Error deleting category ${categoryId}`)
          }
        }
      })
  }

  getCategories(): Observable<Categories[]> {
    return this.categorySubject.asObservable()
  }


  filterProducts(category: Categories){
    this.resetValues();
    this.displayProducts = true;
    this.productService.setFilter(category.name)
  }

  public showError(message: string): void {
    this._snackBar.open(message, undefined, {duration: 10000})
  }

}
