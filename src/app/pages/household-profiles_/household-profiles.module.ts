import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { HouseholdProfilesPage } from './household-profiles';

const routes: Routes = [
  {
    path: '',
    component: HouseholdProfilesPage
  }
];

@NgModule({
  declarations: [
    HouseholdProfilesPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class HouseholdProfilesPageModule {}
