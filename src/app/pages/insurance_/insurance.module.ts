import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { InsurancePage } from './insurance';

const routes: Routes = [
  {
    path: '',
    component: InsurancePage
  }
];

@NgModule({
  declarations: [
    InsurancePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class InsurancePageModule {}
