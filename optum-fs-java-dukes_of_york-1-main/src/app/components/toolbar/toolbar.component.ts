import { AfterViewInit, Component } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart.service.service';
import { AccountService } from 'src/app/services/account.service';
import { UiService } from 'src/app/services/ui.service';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements AfterViewInit{
  //adding so cart shows total number of items when added into cart
  public totalItem: number = 0;

  constructor(public accountService: AccountService, public ui: UiService, public couponService: CouponsService, public cartService: CartServiceService) {
    this.cartService.getCart().subscribe(res=>{
      this.totalItem = res.products.length
    })
  }
  
  ngAfterViewInit(): void {
    const dateElement = document.getElementById("date")
    if(dateElement){
      const date = new Date()
      dateElement.innerHTML = date.toLocaleDateString()
    }
  }
 
}
