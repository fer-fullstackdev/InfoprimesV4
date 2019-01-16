import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SVGHouseHoldView } from './svg-household';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SVGHouseHoldView
  }
];

@NgModule({
  declarations: [
    SVGHouseHoldView,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class SVGViewModule {}
