import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyPoliciesPage } from '../my-policies/my-policies';
import { ProfileReviewPage } from '../profile-review/profile-review';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils';
import { ApiProvider } from '../../providers/api/api';
import { AppGlobals } from '../../shared/app.globals';

import * as _ from 'lodash';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'app-household-profile',
  templateUrl: './household-profile.page.html',
  styleUrls: ['./household-profile.page.scss'],
})
export class HouseholdProfilePage implements OnInit {
  public contact: any;
  public policies: Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public uiUtility: UiUtilsProvider,
              public apiService: ApiProvider,
              public userService: UserProvider,
              public appGlobal: AppGlobals) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseholdProfilePage');
  }

  ngOnInit() {
  }

  init() {
    this.contact = this.navParams.get('contact');
    var contactId = this.contact.id;
    let insurances = this.userService.userData.insurance.data;
    this.policies = _.filter(insurances, function(obj){
      return obj.contact_id == contactId;
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  goMyPolicies(contact: any) {
    this.navCtrl.push(MyPoliciesPage, {contact: contact});
  }

  goProfileReview() {
    this.navCtrl.push(ProfileReviewPage);
  }
}
