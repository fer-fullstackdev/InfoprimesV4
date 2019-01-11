import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordPage } from './reset-password';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordPage
  }
];

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class ResetPasswordPageModule {}
