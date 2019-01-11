import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs';
import { HomePageModule } from '../home/home.module';
import { BrokerPageModule } from '../broker/broker.module';
import { MyProfilePageModule } from '../my-profile/my-profile.module';
import { ReclamationPageModule } from '../reclamation/reclamation.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    BrokerPageModule,
    MyProfilePageModule,
    ReclamationPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}