import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { EmployeeProfilesComponent } from './pages/employee-profiles/employee-profiles.component';
import { VisaManagementComponent } from './pages/visa-management/visa-management.component';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { HousingManagementComponent } from './pages/housing-management/housing-management.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { EmployeeProfileDetailComponent } from './pages/employee-profile-detail/employee-profile-detail.component';
import { LoginGuard } from './guards/login.service';
import { ShowAllApprovedComponent } from './components/visa-status/show-all-approved/show-all-approved/show-all-approved.component';
import { ShowInProgressOnlyComponent } from './components/visa-status/show-in-progress-only/show-in-progress-only/show-in-progress-only.component';

const routes: Routes = [
  {
    path: 'employee-profiles',
    component: EmployeeProfilesComponent,
    title: 'Employee Profiles',
  },
  {
    path: 'employee-profiles/:id',
    component: EmployeeProfileDetailComponent,
    title: 'Employee Profile',
  },
  {
    //     User must be logged out
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [LoginGuard],
  },

  //        Protected Routes(User must be logged in)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'employees', component: EmployeeProfilesComponent },
      {
        path: 'visa-management',
        component: VisaManagementComponent,
        children: [
          {
            path:'',
            pathMatch:'full',
            redirectTo:'approved'
          },
          {
            path: 'approved',
            component: ShowAllApprovedComponent,
          },
          {
            path: 'in-progress',
            component: ShowInProgressOnlyComponent,
          },
        ],
      },
      { path: 'hiring', component: HiringManagementComponent },
      {
        path: 'housing',
        loadChildren: () =>
          import('./pages/housing-management/housing-management.module').then(
            (m) => m.HousingManagementModule
          ),
      },
    ],
  },
  //      Route trapping
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
