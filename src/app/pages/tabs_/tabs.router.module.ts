import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs';
import { HomePage } from '../home/home';
import { BrokerPage } from '../broker/broker';
import { MyProfilePage } from '../my-profile/my-profile';
import { ReclamationPage } from '../reclamation/reclamation';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'broker',
        outlet: 'broker',
        component: BrokerPage
      },
      {
        path: 'myprofile',
        outlet: 'myprofile',
        component: MyProfilePage
      },
      {
        path: 'reclamation',
        outlet: 'reclamation',
        component: ReclamationPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}