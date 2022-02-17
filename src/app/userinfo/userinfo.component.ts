import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import { AuthService } from '.././auth.service';
import { DatabaseService } from '.././database.service';
import * as fb from '@firebase/auth';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  
  user: any;

  constructor( private dbStore: AngularFirestore, private auth: AuthService) {
    this.user = [];
  }

  // check if user has an account in database
  findUserAccount() {
    this.dbStore.collection('users').doc(this.auth.auth.currentUser.uid).valueChanges().subscribe((response: any) => {
      this.user = response;
      })
  }

  // if no user account, use sign up method to create user account
  signUp() {
    this.auth.signUp();
  }

  // confirm that user wants to delete account
  // delete account from database
  deleteUser() {
    if(confirm("Are you sure you want to delete your account?")) 
      this.dbStore.collection('users').doc(this.auth.auth.currentUser.uid).delete()
   }

  ngOnInit(){
    console.log(this.auth)
    this.findUserAccount();
  }

}
