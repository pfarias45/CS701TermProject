import { Component, OnInit} from '@angular/core';
import { AuthService } from '.././auth.service';
import { AngularFirestore} from  '@angular/fire/compat/firestore';
import { DatabaseService } from '.././database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  collapsed = true;
  isAdmin: boolean;
  t: boolean;
  user: any;
 
  constructor(public auth: AuthService, private dbStore: AngularFirestore) {
    this.isAdmin = false;
    this.t = true;
  }

  // if no user account, use sign up method to create user account
  signUp2() {
    this.auth.signUp2()
  }
  
  // login to Google Acount
  logIn() {
    this.auth.logIn()
  }

  // logout of Google Account and redirect user to home component
  logOut() {
    this.auth.logOut()
  }
  
  // set toggle value for navbar (if true, hides navbar)
  toggleClass() {
    this.t = !this.t;
  }

  ngOnInit() {
    console.log(this.auth);
    this.auth.loadUser();
     // gets the redirect result so the page loads with the user name after reload of page
  } 
}
