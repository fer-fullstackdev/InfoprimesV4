import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ProfileReviewPage } from './profile-review';

const routes: Routes = [
  {
    path: '',
    component: ProfileReviewPage
  }
];

@NgModule({
  declarations: [
    ProfileReviewPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class ProfileReviewPageModule {}
