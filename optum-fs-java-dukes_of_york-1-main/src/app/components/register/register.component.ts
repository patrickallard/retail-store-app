import { Component } from '@angular/core';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public hide: boolean = true
  public newUser: User = new User(-1,'','','','',-1)


  constructor(public accountService: AccountService, public ui: UiService) { }

  registerUser() {  
    this.accountService.registerUser(this.newUser)
  }
}
