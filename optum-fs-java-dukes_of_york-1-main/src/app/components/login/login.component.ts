import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide: boolean = true
  public email: string = ''
  public password: string = ''

  constructor(public accountService: AccountService, public ui: UiService) { }

  loginUser() {
      this.accountService.tryLogin(this.email, this.password)
  }
}
