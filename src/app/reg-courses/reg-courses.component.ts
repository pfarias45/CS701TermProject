import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import * as fb from '@firebase/auth';
import { AuthService } from '.././auth.service';


@Component({
  selector: 'app-reg-courses',
  templateUrl: './reg-courses.component.html',
  styleUrls: ['./reg-courses.component.css']
})
export class RegCoursesComponent implements OnInit {
  
  courseList: any[];
  searchText: any;
  savedSchedule: any;
  regCourses: any;
  disabled: boolean;
  user: any;
  noReg: any;

  constructor(private dbStore: AngularFirestore, private auth: AuthService) {
    this.courseList = [];
    this.searchText = '';
    this.regCourses = [];
    this.savedSchedule = JSON.parse(localStorage.getItem(this.auth.auth.currentUser.uid) || '[]');
    this.disabled = true;
    this.user = [];
    this.noReg = 'Duplicate registration found.\n\nRegistration unsuccessful for courses below:'
   }

  // get all courses in database
  getCourses() {
    this.dbStore.collection('courseofferings').valueChanges().subscribe((response: any) => {
      this.courseList = response;
    })
  }

  // get courses user is registered in from database, set it to regCourses array
  getRegCourses() {
    this.dbStore.collection('users').doc(this.auth.auth.currentUser.uid).valueChanges().subscribe((response: any) => {
      this.regCourses = response.regCourses;
      console.log(this.regCourses)
    })
  }

  // add course to saved schedule if saved schedule array does not include cousre
  // add saved schedule to local storage
  // enable registration button
  addSchedule(course: any) {
    if(!this.savedSchedule.some(({id}: {id: any}) => id === course.id)) this.savedSchedule.push(course);
    else alert("You have already added this course to your schedule!");
    window.localStorage.setItem(this.auth.auth.currentUser.uid, JSON.stringify(this.savedSchedule));
    this.disabled = false;
  }

  // remove course from saved schedule array 
  // update local storage
  // if saved schedule array is empty, disable registration button
  removeSchedule(course: any) {
    this.savedSchedule.splice(this.savedSchedule.indexOf(course), 1);
    window.localStorage.setItem(this.auth.auth.currentUser.uid, JSON.stringify(this.savedSchedule));
    if (this.savedSchedule.length == 0) this.disabled = true;
  }

  // add every course in saved schedule arrya to regCourses array
  // update user account in database with updated registration (new registration is added to 
  // any previous existing registration in database)
  // duplicate reg throws error
  // disable registration button
  register() {
    for(let i = 0; i < this.savedSchedule.length; i++) {
      if(!this.regCourses.some(({id}: {id: any}) => id === this.savedSchedule[i].id)) {
        this.regCourses.push(this.savedSchedule[i]);
        this.dbStore.collection('users').doc(this.auth.auth.currentUser.uid).update({
          regCourses: this.regCourses})
        }
      else this.noReg += '\n' + this.savedSchedule[i].name.toString()
    }
    console.log(this.noReg)
    if (this.noReg.length > 77) alert(this.noReg)
    this.savedSchedule = [];
    window.localStorage.clear();
    this.disabled = true;
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
    this.findUserAccount()
    this.getCourses()
    this.getRegCourses()
    if (this.savedSchedule.length > 0) this.disabled = false;
  }

}