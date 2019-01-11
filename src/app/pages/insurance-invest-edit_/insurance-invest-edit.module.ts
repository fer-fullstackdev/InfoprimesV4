import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceInvestEditPage } from './insurance-invest-edit';

const routes: Routes = [
  {
    path: '',
    component: InsuranceInvestEditPage
  }
];

@NgModule({
  declarations: [
    InsuranceInvestEditPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class InsuranceInvestEditPageModule {}
