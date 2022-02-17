import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { CurrentcoursesComponent } from './currentcourses/currentcourses.component';
import { RegCoursesComponent } from './reg-courses/reg-courses.component';
import { ManageCoursesComponent } from './admin/managecourses/managecourses.component';


import { GuardAuthService } from './guardauth.service';

// If user types in web address for route, GuardAuthService prevents user from
// accessing routes unless signed on
const routes: Routes = [   
{path: '', component: HomeComponent},
{path: 'AccountInfo', component: UserinfoComponent, canActivate: [GuardAuthService]},
{path: 'MyCourses', component: CurrentcoursesComponent, canActivate: [GuardAuthService]},
{path: 'Register', component: RegCoursesComponent, canActivate: [GuardAuthService]},
{path: 'ManageCatalog', component: ManageCoursesComponent, canActivate: [GuardAuthService]}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
