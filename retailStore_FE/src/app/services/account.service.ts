import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, take} from 'rxjs';
import { EditAccountComponent } from '../components/edit-account/edit-account.component';
import { User } from '../data/user';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public account: User[] = []
  public accountEdit: User = new User(-1,'','','Guest','',-1)
  private accountSubject: Subject<User[]> = new Subject()
  public displayEdit: boolean = false

  public isLoggedIn: boolean = false
  public guestUser: User = new User(-1,'','','Guest','',-1)
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(this.guestUser)

  public displayProfile: boolean = false

  constructor(private http: HttpClient, public dialog: MatDialog,
    private _snackBar: MatSnackBar, private ui : UiService) {
    this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
    
    if(this.isLoggedIn){
      var userString = localStorage.getItem("user")
      if(userString){
        var user = JSON.parse(userString)
        this.tryLogin(user.email,user.password)
      }
    }
  }

  public showError(message: string): void {
    this._snackBar.open(message, undefined, {duration: 10000})
  }

  tryLogin(email: string, password: string): void {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", email)
    queryParams = queryParams.append("password", password)
    this.http.get<User>('http://localhost:8080/users', { params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user)
        },
        error: (err) => {
          if(err.status === 404){
            this.showError("Invalid Username or Password.")
          } else {
            this.showError("Error logging in.")
          }
        }
      })

  }

  registerUser(newUser: User): void {
    this.http.post<User>('http://localhost:8080/users', newUser)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user)
        },
        error: (err) => {
          if(err.status === 400){
            this.showError("Username already taken.")
          } else {
            this.showError("Error registering.")
          }
        }
      })
  }

  logoutUser() {
    localStorage.clear()
    this.isLoggedIn = false
    this.currentUser.next(this.guestUser)
  }

  successfulLogin(user: User) {
    localStorage.setItem("isLoggedIn","true")
    localStorage.setItem("user",JSON.stringify(user))
    this.isLoggedIn = true
    this.currentUser.next(user)
    if (this.currentUser.getValue().role === 2) {
      this.ui.showAccount()
    } else {
      this.ui.showProducts()
    }
  }

  getCurrentUser(){
    return this.currentUser.asObservable()
  }

  getShowEdit() {
    this.displayEdit = true
  }

  public changeToProfile() {
    this.displayProfile = true
  }

  public hideProfile() {
    this.ui.displayAccount = false
  }

  displayAccountEdit() {
    this.getShowEdit
  }

  updateEditedAccount(updatedAccount: User): void {
      this.http.put(`http://localhost:8080/users/${updatedAccount.id}?email=${this.currentUser.value.email}&password=${this.currentUser.value.password}`, updatedAccount)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.updateAccount()
          },
          error: (err) => this.showError("Error updating account")
        })
  }

  updateEditedProfile(updatedAccount: User): void {
    this.http.put(`http://localhost:8080/users/${updatedAccount.id}?email=${this.currentUser.value.email}&password=${this.currentUser.value.password}`, updatedAccount)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateAccount()
          this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
              this.currentUser.next(updatedAccount)
      },
        error: (err) => this.showError("Error updating account")
      })
}

  updateAccount(): void {
    this.http
      .get<User[]>('http://localhost:8080/users')
      .pipe(take(1))
      .subscribe({ 
        next: account => {
        this.account = account
        this.accountSubject.next(this.account)
      },
      error: () => {
        this.showError('Failed to update account')
      }
    })
  }

  whenAccountUpdated(): Observable<User[]> {
    return this.accountSubject.asObservable()
  }

  whenProfileUpdated(): Observable<User> {
    return this.currentUser.asObservable()
  }


  addAccount(profile: User): void {
    this.http
      .post('http://localhost:8080/users', profile)
      .pipe(take(1))
      .subscribe({
        next: () => {this.updateAccount()
        },
        error: () => {
          this.showError('Failed to add account')
        }
      })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditAccountComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getAccountByEmailandPassword(email: string, password: string): void {
    this.http
      .get<User>(`http://localhost:8080/users?email=${email}&password=${password}`)
      .pipe(take(1))
      .subscribe({
        next: account => {
          this.accountEdit = account
          this.openDialog('0ms', '0ms')
        },
        error: () => {
          this.showError('Failed to get account')
        }
      })
  }

  deleteAccountById(id: number): void {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", this.currentUser.value.email)
    queryParams = queryParams.append("password", this.currentUser.value.password)
    this.http
      .delete(`http://localhost:8080/users/${id}`, { params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: () => {
        this.updateAccount()
        },
        error: () => {
          this.showError('Failed to delete account')
        }
      })
  }

  deleteProfileById(id: number, email: string, password: string): void {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", this.currentUser.value.email)
    queryParams = queryParams.append("password", this.currentUser.value.password)
    this.http
      .delete(`http://localhost:8080/users/${id}`, {params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: () => {
        this.logoutUser()
        this.hideProfile()
        this.showError('Successfully deleted account')
        this.ui.displayLogin= true;
        },
        error: () => {
          this.showError('Failed to delete account')
        }
      })
  }

  userIsGuest(){
    return this.currentUser.getValue().role === -1;
  }

  userIsCustomer(){
    return this.currentUser.getValue().role === 0;
  }

  userIsShopkeeper(){
    return this.currentUser.getValue().role === 1;
  }

  userIsAdmin(){
    return this.currentUser.getValue().role === 2;
  }
}
