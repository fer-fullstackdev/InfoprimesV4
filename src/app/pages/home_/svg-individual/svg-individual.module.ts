import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { SVGView } from './svg-individual';

@NgModule({
  declarations: [
    SVGView,
  ],
  imports: [
    IonicPageModule.forChild(SVGView),
  ],
})
export class SVGViewModule {}
