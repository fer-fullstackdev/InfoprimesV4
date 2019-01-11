import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { SVGHouseHoldView } from './svg-household';

@NgModule({
  declarations: [
    SVGHouseHoldView,
  ],
  imports: [
    IonicPageModule.forChild(SVGHouseHoldView),
  ],
})
export class SVGViewModule {}
