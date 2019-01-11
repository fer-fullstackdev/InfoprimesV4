import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { LiabilitiesEditPage } from './liabilities-edit';

const routes: Routes = [
  {
    path: '',
    component: LiabilitiesEditPage
  }
];

@NgModule({
  declarations: [
    LiabilitiesEditPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class LiabilitiesEditPageModule {}
