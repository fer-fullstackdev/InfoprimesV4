import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ResetpasswordConfirmPage } from './resetpassword-confirm';

const routes: Routes = [
  {
    path: '',
    component: ResetpasswordConfirmPage
  }
];

@NgModule({
  declarations: [
    ResetpasswordConfirmPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class ResetpasswordConfirmPageModule {}
