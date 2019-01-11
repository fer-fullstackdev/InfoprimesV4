import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { MyPoliciesPage } from './my-policies';

const routes: Routes = [
  {
    path: '',
    component: MyPoliciesPage
  }
];

@NgModule({
  declarations: [
    MyPoliciesPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class MyPoliciesPageModule {}
