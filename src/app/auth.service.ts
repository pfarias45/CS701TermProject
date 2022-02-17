import { Injectable } from '@angular/core';
import { Router }  from '@angular/router';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import * as fb from '@firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { DatabaseService } from './database.service';
import { isThisTypeNode } from 'typescript';


@Injectable ()

export class AuthService {
  
  auth: any;

  constructor(private router: Router, private dbService: DatabaseService) {
    this.auth = fb.getAuth();
  }
 
  // if no user account, use sign up method to create user account
  signUp() {
    fb.signInWithPopup(this.auth, new fb.GoogleAuthProvider).then((result) => {
      this.dbService.createUser(result);
     console.log(result)})
  }

  signUp2() {
    if(confirm("Only sign up if you are a NEW user. If you are an existing user, your data will be overwritten (log in instead)."))
      {fb.signInWithPopup(this.auth, new fb.GoogleAuthProvider).then((result) => {
      this.dbService.createUser(result);
     console.log(result)})
      }
  }
  // login with google
  logIn() {
    fb.signInWithPopup(this.auth, new fb.GoogleAuthProvider)
  }

  // load user credentials from a redirect
  loadUser() {
    fb.getRedirectResult(this.auth).then((result) => {
      return result;
    }) 
  }
  
  // logout of Google Account and redirect user to home component
  logOut() {
    this.auth.signOut();
    this.router.navigate(['']);
  }

}

