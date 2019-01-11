import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { TouchidPage } from './touchid';

const routes: Routes = [
  {
    path: '',
    component: TouchidPage
  }
];

@NgModule({
  declarations: [
    TouchidPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class TouchidPageModule {}
