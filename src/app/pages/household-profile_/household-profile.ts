import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

import { MyPoliciesPage } from '../my-policies/my-policies';
import { ProfileReviewPage } from '../profile-review/profile-review';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';
import { ApiService } from '../../services/api/api.service';
import { AppGlobals } from '../../shared/app.globals';

import * as _ from 'lodash';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'page-household-profile',
  templateUrl: 'household-profile.html',
})
export class HouseholdProfilePage {
  public contact: any;
  public policies: Array<any> = [];

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public uiUtility: UiUtilsService,
            public apiService: ApiService,
            public userService: UserService,
            public appGlobal: AppGlobals) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseholdProfilePage');
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
