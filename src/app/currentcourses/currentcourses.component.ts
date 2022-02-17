import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/compat/firestore';
import * as fb from '@firebase/auth';
import { AuthService } from '.././auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-currentcourses',
  templateUrl: './currentcourses.component.html',
  styleUrls: ['./currentcourses.component.css']
})
export class CurrentcoursesComponent implements OnInit {

  regCourses: any[];
  user: any;
  
  constructor(private dbStore: AngularFirestore, private auth: AuthService) {
    this.regCourses = [];
    this.user = [];
   }

   // get courses user is registered in from database
   getRegCourses() {
    this.dbStore.collection('users').doc(this.auth.auth.currentUser.uid).valueChanges().subscribe((response: any) => {
      this.regCourses = response.regCourses;
      console.log(this.regCourses)
    })
  }

  // drop course from registration, update user account in database
  dropRegCourse(course: any) {
    if(confirm("Are you sure you want to unregister from this course?")) 
      this.regCourses.splice(this.regCourses.indexOf(course), 1);
      this.dbStore.collection('users').doc(this.auth.auth.currentUser.uid).update({
        regCourses: this.regCourses});
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

  // saves courses to PDF file
  public openPDF():void {
    let data: any = document.getElementById('coursework');
        
    html2canvas(data).then(canvas => {
        
        let fileWidth = 158;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 10;
        PDF.addImage(FILEURI, 'PNG', 20, position, fileWidth, fileHeight)
        
        PDF.save(`${this.user.name}_RegisteredCourses.pdf`);
    });     
    }

  ngOnInit() {
    this.getRegCourses();
    this.findUserAccount();
  }

}
