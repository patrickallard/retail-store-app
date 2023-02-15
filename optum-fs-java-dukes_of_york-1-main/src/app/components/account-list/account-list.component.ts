import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/data/user';
import { AccountService } from 'src/app/services/account.service';
import { EditAccountComponent } from '../edit-account/edit-account.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, AfterViewInit {
  

  constructor(public accountService: AccountService, public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer){
    this.accountSub = this.accountService.whenAccountUpdated()
    .subscribe(accounts => this.dataSource.data = accounts)
  }

  ngOnInit(): void {}

  // Table stuff
  public displayNewAccount: boolean = false
  public newAccount: User = new User(-1,'', '', '', '', 0)

  displayedColumns: string[] = ['action','id', 'password', 'email', 'fname', 'lname', 'role'];
  public dataSource = new MatTableDataSource<User>()
  private accountSub: Subscription


  getData() {
    this.accountService.updateAccount()
    this.dataSource.data = this.accountService.account
    }

    public roleSelector = 0
    addAccount() {
      this.newAccount.role = this.roleSelector
    this.accountService.addAccount(this.newAccount)
    }

    displayCreateAccount() {
      this.displayNewAccount= true
    }

    roles: Role[] = [
      {value: 0, viewValue: 'Customer'},
      {value: 1, viewValue: 'Shopkeeper'},
      {value: 2, viewValue: 'Admin'},
    ];

    public newAccountPassword = ''
    public newAccountEmail = ''
    public newAccountFname = ''
    public newAccountLname = ''
    public newAccountRole = 0

    @ViewChild(MatSort) 
    sort: MatSort = new MatSort
    

    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }

    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value
      this.dataSource.filter = filterValue.trim().toLowerCase()
    }

 }
 interface Role {
  value: number;
  viewValue: string;
}

