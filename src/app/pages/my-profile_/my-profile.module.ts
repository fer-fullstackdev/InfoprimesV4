import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { MyProfilePage } from './my-profile';

const routes: Routes = [
  {
    path: '',
    component: MyProfilePage
  }
];

@NgModule({
  declarations: [
    MyProfilePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class MyProfilePageModule {}
