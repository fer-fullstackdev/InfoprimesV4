import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { SettingPage } from './setting';

const routes: Routes = [
  {
    path: '',
    component: SettingPage
  }
];

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class SettingPageModule {}
