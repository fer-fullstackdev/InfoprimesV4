import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SVGView } from './svg-individual';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SVGView
  }
];

@NgModule({
  declarations: [
    SVGView,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class SVGViewModule {}
