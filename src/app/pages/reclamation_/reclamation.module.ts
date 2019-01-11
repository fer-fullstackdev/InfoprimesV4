import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ReclamationPage } from './reclamation';

const routes: Routes = [
  {
    path: '',
    component: ReclamationPage
  }
];

@NgModule({
  declarations: [
    ReclamationPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class ReclamationPageModule {}
