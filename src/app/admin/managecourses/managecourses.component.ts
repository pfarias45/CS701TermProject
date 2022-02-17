import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/compat/firestore';

import * as fb from '@firebase/auth';
import { AuthService } from '../.././auth.service';


@Component({
  selector: 'app-managecourses',
  templateUrl: './managecourses.component.html',
  styleUrls: ['./managecourses.component.css']
})
export class ManageCoursesComponent implements OnInit {

  course: any;
  courseList: any;
  disabled: boolean;
  user: any;

  constructor(private dbStore: AngularFirestore, private auth: AuthService) {
    this.course = {
        requirement: '',
        name: '',
        id: '',
        dt: '',
        location: '',
        term: '',
        description: ''
    }
    this.courseList = [];
    this.disabled = true;
    this.user = [];
   }

   // add Courses from form input to database
  updateCatalog(){
    this.dbStore.collection('courseofferings').doc(this.course.id).set(this.course);
    this.course = {
      requirement: '',
      name: '',
      id: '',
      dt: '',
      location: '',
      term: '',
      description: ''
  }
  }

   // delete Courses from database
  deleteCourse(course: any) {
    if(confirm("Are you sure you want to delete this course from the catalog?")) 
      this.dbStore.collection('courseofferings').doc(course.id).delete();
  }

  // get all courses in database
  getCourses() {
    this.dbStore.collection('courseofferings').valueChanges().subscribe((response: any) => {
      this.courseList = response;
      console.log(response)
    })
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

  ngOnInit() {
    this.getCourses();
    this.findUserAccount();
  }

}
