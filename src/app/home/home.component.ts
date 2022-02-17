import { Component, OnInit } from '@angular/core';
import * as fb from '@firebase/auth';
import { AngularFirestore } from  '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth: any;
  user: any;

  constructor( private dbStore: AngularFirestore) {
    this.auth = fb.getAuth();
  }

  ngOnInit(): void {
  }

}

