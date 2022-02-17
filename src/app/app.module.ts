import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { FormsModule } from '@angular/forms';

import { UserinfoComponent } from './userinfo/userinfo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegCoursesComponent } from './reg-courses/reg-courses.component';
import { CurrentcoursesComponent } from './currentcourses/currentcourses.component';

import { GuardAuthService } from './guardauth.service';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service'


import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as firebase1 from '@firebase/app';
import { ManageCoursesComponent } from './admin/managecourses/managecourses.component';
import { FilterPipe } from './filter.pipe';
import { HomeComponent } from './home/home.component';

const firebase = {
    apiKey: "AIzaSyBHOPTJZA2Mq5r5oU_5WvUwXOeH26nPAtU",
    authDomain: "studentregtool.firebaseapp.com",
    projectId: "studentregtool",
    storageBucket: "studentregtool.appspot.com",
    messagingSenderId: "157354330179",
    appId: "1:157354330179:web:98f41e4d74493f2ded6cf6",
    measurementId: "G-811TDPEPNL"
  };

firebase1.initializeApp(firebase);

@NgModule({
  declarations: [
    AppComponent,
    UserinfoComponent,
    NavbarComponent,
    RegCoursesComponent,
    ManageCoursesComponent,
    FilterPipe,
    CurrentcoursesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, NgbModule // storage
  ],
  providers: [ 
    DatabaseService,
    GuardAuthService,
    AuthService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
