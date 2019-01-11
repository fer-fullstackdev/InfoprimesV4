import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { MortgageLoanEditPage } from './mortgage-loan-edit';

const routes: Routes = [
  {
    path: '',
    component: MortgageLoanEditPage
  }
];

@NgModule({
  declarations: [
    MortgageLoanEditPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class MortgageLoanEditPageModule {}
