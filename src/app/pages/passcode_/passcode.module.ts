import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { PasscodePage } from './passcode';

const routes: Routes = [
  {
    path: '',
    component: PasscodePage
  }
];

@NgModule({
  declarations: [
    PasscodePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class PasscodePageModule {}
