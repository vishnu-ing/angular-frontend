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

const routes: Routes = [
  {
    //     User must be logged out
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [AuthGuard],
  },

  //        Protected Routes(User must be logged in)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'employees', component: EmployeeProfilesComponent },
      { path: 'visa-management', component: VisaManagementComponent },
      { path: 'hiring', component: HiringManagementComponent },
      { path: 'housing', component: HousingManagementComponent },
    ],
  },
  //      Route trapping
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
