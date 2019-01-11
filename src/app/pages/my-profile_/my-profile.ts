import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';

import { SettingPage } from '../setting/setting';
import { HouseholdProfilesPage } from '../household-profiles/household-profiles';
import { ProfileReviewPage } from '../profile-review/profile-review';
import { MyPoliciesPage } from '../my-policies/my-policies';
import * as _ from 'lodash';
import { HouseholdProfilePage } from '../household-profile/household-profile';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  public allData: any;
  public myProfile: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: ApiService,
              public userService: UserService,
              public uiUtility: UiUtilsService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.myProfile = _.find(this.userService.userData.contacts.data, {role: 'main'});
  }

  goSetting() {
    this.navCtrl.push(SettingPage);
  }

  goHouseholdProfiles() {
    this.navCtrl.push(HouseholdProfilesPage);
  }

  goHouseholdProfile(contact: any) {
    this.navCtrl.push(HouseholdProfilePage, {contact: contact});
  }

  goProfileReview() {
    this.navCtrl.push(ProfileReviewPage);
  }

  goMyPolicies() {
    this.navCtrl.push(MyPoliciesPage);
  }
}
