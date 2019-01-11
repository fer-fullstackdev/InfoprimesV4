import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmationPage } from './confirmation';

const routes: Routes = [
  {
    path: '',
    component: ConfirmationPage
  }
];

@NgModule({
  declarations: [
    ConfirmationPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class ConfirmationPageModule {}
