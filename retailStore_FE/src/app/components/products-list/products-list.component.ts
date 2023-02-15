import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/data/product';
import { AccountService } from 'src/app/services/account.service';
import { CartServiceService } from 'src/app/services/cart.service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public products: Product[] = []
  public productSubscription: Subscription

  public errorExists = false;
  public lossProducts: Product[] = []
  public mapProducts: Product[] = []

  constructor(public productService: ProductService, public accountService: AccountService, public cartService : CartServiceService) {
    this.productSubscription = productService.getProducts().subscribe((products) => {
      this.products = products
    })
  }

  ngOnInit() {
    this.productService.getProducts();
    this.getWarnings();
  }

  getWarnings() {
    this.lossProducts = []
    this.mapProducts = []
    for (let product of this.products) {
      let lossError = this.productService.findLossError(product)
      if (lossError)
        this.lossProducts.push(lossError);

      let mapError = this.productService.findMAPError(product)
      if (mapError)
        this.mapProducts.push(mapError);
    }
    if (this.lossProducts[0] != null || this.mapProducts[0] != null) {
      this.errorExists = true;
    }
    return true
  }

  filterProducts(): Product[] {
    if (this.productService.categoryFilter === '') {
      return this.products
    }
    return this.products.filter((p) => p.category?.name === this.productService.categoryFilter)
  }
}
