import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  
  @Input() account: User

  public id: number
  public fname: string
  public lname: string 
  public email: string
  public password: string 
  public role: number 
  
  public accountService: AccountService

  constructor(accountService: AccountService, public ui: UiService, public dialogRef: MatDialogRef<EditAccountComponent>) {
    this.accountService = accountService
    this.account = this.accountService.accountEdit
    this.id = this.accountService.accountEdit.id
    this.fname = this.accountService.accountEdit.fname
    this.lname = this.accountService.accountEdit.lname
    this.email = this.accountService.accountEdit.email
    this.password = this.accountService.accountEdit.password
    this.role = this.accountService.accountEdit.role
  }

  ngOnInit(): void {
  }

  updateFirstName(fname: string): void {
    this.account.fname = fname
  }

  updateLastName(lname: string): void {
    this.account.lname = lname
  }

  updateEmail(email: string): void {
    this.account.email = email
  }

  updatePassword(password: string): void {
    this.account.password = password
  }

  updateRole(role: number): void {
    this.account.role = role
  }

  onApply(): void {
    // {} - create a new object
    // ... - deconstruct the following thing
    if (this.accountService.currentUser.value.role == 2) this.accountService.accountEdit
    if (this.accountService.currentUser.value.role == 2 && this.role != 2) {

    }
    if (this.email === this.accountService.currentUser.value.email) {
      this.accountService.updateEditedProfile( {
        ...this.account
      })
    }

    this.accountService.updateEditedAccount(
      {
        ...this.account
      }
    )
    this.accountService.displayEdit = false
  }

  onCancel(): void {
    this.accountService.displayEdit = false
  }
}
