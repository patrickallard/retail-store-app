import { Component } from '@angular/core';
import { CartServiceService } from './services/cart.service.service';
import { AccountService } from './services/account.service';
import { UiService } from './services/ui.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'optum-fs-java-dukes_of_york-1';
  
  constructor(public cart: CartServiceService, public accountService: AccountService, public ui: UiService, public productService : ProductService) {}

}
