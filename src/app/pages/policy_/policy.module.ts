import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { PolicyPage } from './policy';

const routes: Routes = [
  {
    path: '',
    component: PolicyPage
  }
];

@NgModule({
  declarations: [
    PolicyPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class PolicyPageModule {}
