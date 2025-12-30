import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material modules (add more as needed)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// Material modules for HR hiring
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
// Material modules for HR hiring
// NgRx
import { StoreModule } from '@ngrx/store';

// App components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeProfilesComponent } from './pages/employee-profiles/employee-profiles.component';
import { VisaManagementComponent } from './pages/visa-management/visa-management.component';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';

import { HiringReducer } from './store/reducers/hiring.reducer';
import { HiringTableComponent } from './components/hiring-table/hiring-table.component';
import { HiringEffects } from './store/effects/hiring.effects';
import { RegistrationManagementComponent } from './components/registration-management/registration-management.component';
import { authReducer } from './store/auth/auth.reducers';
import { AuthInterceptor } from './interceptors';
import { AuthEffectsService } from './store/auth/auth.effects.service';
import { employeeProfilesReducer } from './store/employee-profiles/employee-profiles.reducers';
import { EmployeeProfilesEffectsService } from './store/employee-profiles/employee-profiles.effects.service';
import { EmployeeProfileDetailComponent } from './pages/employee-profile-detail/employee-profile-detail.component';
import { ShowAllApprovedComponent } from './components/visa-status/show-all-approved/show-all-approved/show-all-approved.component';
import { ShowInProgressOnlyComponent } from './components/visa-status/show-in-progress-only/show-in-progress-only/show-in-progress-only.component';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EmployeeProfilesComponent,
    VisaManagementComponent,
    HiringManagementComponent,
    MainLayoutComponent,
    LoginComponent,
    HiringTableComponent,
    RegistrationManagementComponent,
    EmployeeProfileDetailComponent,
    ShowAllApprovedComponent,
    ShowInProgressOnlyComponent,
    HiringTableComponent,
    RegistrationManagementComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatSnackBarModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreModule.forFeature('hiring', HiringReducer),
    MatDividerModule,
    CommonModule,
    MatProgressSpinnerModule,
        MatDividerModule,
    MatTabsModule,
    MatTableModule,
    StoreModule.forRoot({
      auth: authReducer,
      employeeProfiles: employeeProfilesReducer,
    }),
    EffectsModule.forRoot([
      HiringEffects,
      AuthEffectsService,
      EmployeeProfilesEffectsService,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreModule.forFeature('hiring', HiringReducer),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
