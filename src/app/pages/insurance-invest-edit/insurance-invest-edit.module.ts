import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InsuranceInvestEditPage } from './insurance-invest-edit.page';

const routes: Routes = [
  {
    path: '',
    component: InsuranceInvestEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsuranceInvestEditPage]
})
export class InsuranceInvestEditPageModule {}
