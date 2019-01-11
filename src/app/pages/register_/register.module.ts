import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class RegisterPageModule {}
