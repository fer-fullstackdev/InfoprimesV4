import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { HouseholdProfilePage } from './household-profile';

const routes: Routes = [
  {
    path: '',
    component: HouseholdProfilePage
  }
];

@NgModule({
  declarations: [
    HouseholdProfilePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class HouseholdProfilePageModule {}
