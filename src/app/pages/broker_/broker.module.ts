import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { BrokerPage } from './broker';

const routes: Routes = [
  {
    path: '',
    component: BrokerPage
  }
];

@NgModule({
  declarations: [
    BrokerPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class BrokerPageModule {}
