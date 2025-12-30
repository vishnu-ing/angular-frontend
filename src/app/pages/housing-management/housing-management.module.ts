import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HousingRoutingModule } from './housing-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

import { HousingManagementComponent } from './housing-management.component';
import { HousingListComponent } from './housing-list.component';
import { HousingDetailsComponent } from './housing-details.component';
import { HousingFormComponent } from './housing-form.component';

@NgModule({
  declarations: [
    HousingManagementComponent,
    HousingListComponent,
    HousingDetailsComponent,
    HousingFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HousingRoutingModule,
    MatTabsModule,
  ],
  providers: [DatePipe],
})
export class HousingManagementModule {
  constructor() {
    console.log('DEBUG: HousingManagementModule loaded');
  }
}
