import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyPoliciesPage } from './my-policies.page';

const routes: Routes = [
  {
    path: '',
    component: MyPoliciesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyPoliciesPage]
})
export class MyPoliciesPageModule {}
