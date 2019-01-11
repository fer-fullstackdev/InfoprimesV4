import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { AssetsEditPage } from './assets-edit';

const routes: Routes = [
  {
    path: '',
    component: AssetsEditPage
  }
];

@NgModule({
  declarations: [
    AssetsEditPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class AssetsEditPageModule {}
