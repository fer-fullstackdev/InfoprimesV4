import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { PaperworkPage } from './paperwork';

const routes: Routes = [
  {
    path: '',
    component: PaperworkPage
  }
];

@NgModule({
  declarations: [
    PaperworkPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class PaperworkPageModule {}
