import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ProfileEditPage } from './profile-edit';

const routes: Routes = [
  {
    path: '',
    component: ProfileEditPage
  }
];

@NgModule({
  declarations: [
    ProfileEditPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class ProfileEditPageModule {}
