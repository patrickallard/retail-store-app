import { Component, Input } from '@angular/core';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  @Input() account: User | undefined;

  constructor(public accountService: AccountService){}

}
