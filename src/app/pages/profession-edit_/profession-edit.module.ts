import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionEditPage } from './profession-edit';

const routes: Routes = [
  {
    path: '',
    component: ProfessionEditPage
  }
];

@NgModule({
  declarations: [
    ProfessionEditPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class ProfessionEditPageModule {}
