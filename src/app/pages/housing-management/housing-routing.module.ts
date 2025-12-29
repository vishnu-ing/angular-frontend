import { HousingListComponent } from './housing-list.component';
import { HousingFormComponent } from './housing-form.component';
import { HousingDetailsComponent } from './housing-details.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HousingListComponent }, // summary list
  { path: 'new', component: HousingFormComponent }, // add house
  { path: ':id', component: HousingDetailsComponent }, // house details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousingRoutingModule {}
