import { Component } from '@angular/core';
import { Categories } from 'src/app/data/categories';
import { AccountService } from 'src/app/services/account.service';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  public name = ''
  public price: number = 0
  public available: Date = new Date()
  public description = ''
  public imageURL = ''
  public category = null
  public MAP = 0

  constructor(public productService: ProductService, public ui : UiService, private accountService : AccountService){}

  createProduct(){
    this.productService.createProduct(this.accountService.currentUser.getValue(), this.name, this.available, this.description, this.price, this.imageURL, this.category, this.MAP);
  }

}
