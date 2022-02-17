import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import * as fb from '@firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 

@Injectable()

export class DatabaseService {


constructor (private dbStore: AngularFirestore) {
  }

// create user account
 async createUser(data: any) {
  await this.dbStore.collection('users').doc(data.user.uid).set({
    name: data.user.displayName, 
    email: data.user.email,
    isAdmin: false,
    regCourses: []
  });
 }

}