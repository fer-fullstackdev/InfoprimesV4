import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HouseholdProfilesPage } from './household-profiles.page';

const routes: Routes = [
  {
    path: '',
    component: HouseholdProfilesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HouseholdProfilesPage]
})
export class HouseholdProfilesPageModule {}
