import { Component, Input } from '@angular/core';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';
import { UiService } from 'src/app/services/ui.service';
import { EditAccountComponent } from '../edit-account/edit-account.component';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @Input() account: User | undefined

  public accountSub: Subscription

  public id: number | undefined
  public fname: string | undefined
  public lname: string | undefined
  public email: string | undefined
  public password: string | undefined
  public role: number | undefined


  constructor(public accountService: AccountService, public ui: UiService, public dialog: MatDialog) {
    this.accountSub = this.accountService.whenProfileUpdated()
    .subscribe(account => this.account = account)
    this.id = this.account?.id
    this.fname = this.account?.fname
    this.lname = this.account?.lname
    this.email = this.account?.email
    this.password = this.account?.password
    this.role = this.account?.role
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe()
  }

  showValues() {
    console.log(this.fname)
  }
}
