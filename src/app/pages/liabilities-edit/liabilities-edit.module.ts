import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LiabilitiesEditPage } from './liabilities-edit.page';

const routes: Routes = [
  {
    path: '',
    component: LiabilitiesEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LiabilitiesEditPage]
})
export class LiabilitiesEditPageModule {}
