import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

import { ApiService } from '../../services/api/api.service';
import { UiUtilsService } from '../../services/ui-utils/ui-utils.service';

import { ProfileReviewPage } from '../profile-review/profile-review';
import { HouseholdProfilePage } from '../household-profile/household-profile';

import * as _ from 'lodash';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'page-household-profiles',
  templateUrl: 'household-profiles.html',
})
export class HouseholdProfilesPage {
  public allData: any;
  public myProfile: any;
  public spouseProfile: any;
  public childs: Array<any> = [];
  public insurances: Array<any> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: ApiService,
              public userService: UserService,
              public uiUtility: UiUtilsService) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseholdProfilesPage');
  }

  init() {
    this.myProfile = _.find(this.userService.userData.contacts.data, {role: 'main'});
    this.spouseProfile = _.find(this.userService.userData.contacts.data, {role: 'coapplicant'});
    this.childs = _.filter(this.userService.userData.contacts.data, function(obj){
      return obj.role == 'other';
    });
    this.insurances = this.userService.userData.insurance.data;
  }

  goBack() {
    this.navCtrl.pop();
  }

  goProfileReview() {
    this.navCtrl.push(ProfileReviewPage);
  }

  goHouseholdProfile(contact: any) {
    this.navCtrl.push(HouseholdProfilePage, {contact: contact});
  }

  getPoliciesByContactID(contactId: any) {
    let polices = _.filter(this.insurances, function(obj){
      return obj.contact_id == contactId;
    });
    return polices.length;
  }
}
