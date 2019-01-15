import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, Select } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppGlobals } from '../../shared/app.globals';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

export class PhoneNumberValidator {
  static validPhoneNumber(fc: FormControl){
    let val = fc.value;
    if(val == undefined) val = '';
    let isInValid = /[A-Za-z]/.test( val )
    if(isInValid) {
      return ({validPhoneNumber: true});
    } else {
      return (null);
    }
  }
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  formGroup: FormGroup;
  @ViewChild('monthSelect') monthSelect: Select;
  @ViewChild('daySelect') daySelect: Select;
  @ViewChild('yearSelect') yearSelect: Select;
  @ViewChild('householdSelect') householdSelect: Select;
  @ViewChild('smokerSelect') smokerSelect: Select;
  public type: string;
  public action: string;
  public title: string;
  public imageUrl: any;
  public data: any;
  public smoker: string;
  public month: string;
  public year: string;
  public day: string;
  public years: any;
  public months: any;
  public days: any;
  public relationship: string;
  public actionBtnAttempt: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public appGlobal: AppGlobals,
              private camera: Camera,
              private translate: TranslateService,
              private userService: UserService) {
    this.type = this.navParams.get('type');
    this.action = this.navParams.get('action');
    this.data = this.navParams.get('data');
    this.years = appGlobal.years;
    this.months = appGlobal.months;
    this.days = this.appGlobal.getDays(this.year, this.month);

    if(this.action == 'new') {
      this.translate.get('GENERIC.NEW_FEM', {}).subscribe((res: string) => {
        this.title = res;
        this.translate.get('GENERIC.PERSON', {}).subscribe((res: string) => {
          this.title = this.title + ' ' +  res;
        });
      });
    } else {
      if(this.type == 'general') {
        this.translate.get('INSURANCE_REV.GENERAL_INFORMATION_SECTION_TITLE', {}).subscribe((res: string) => {
          this.title = res;
        });
      }
      if(this.type == 'household') {
        this.translate.get('GENERIC.EDIT', {}).subscribe((res: string) => {
          this.title = res;
          this.translate.get('GENERIC.PERSON', {}).subscribe((res: string) => {
            this.title = this.title + ' ' +  res;
          });
        });
      }
      this.smoker = this.data.smoker;
      this.year = this.data.dob.split('-')[0];

      this.setMonth(this.data.dob.split('-')[1]);

      this.day = this.data.dob.split('-')[2];
      if(this.data.role == 'other' && this.data.sex == 'male')
        this.relationship = 'son';
      if(this.data.role == 'other' && this.data.sex == 'female')
        this.relationship = 'daughter';
      if(this.data.role == 'coapplicant')
        this.relationship = 'spouse';
    }

    //get main Contact id
    const mainContact = _.find(this.userService.userData.contacts.data, {role: 'main'});
    const imageId = this.type === 'general' ? mainContact.id : this.data.id;
    this.imageUrl = imageId === undefined ? 'assets/imgs/dummy-profile-blank.png' : 'assets/imgs/profile_imgs/' + imageId + '.png';
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([

      ])),
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      mainphone: new FormControl('', Validators.compose([
        PhoneNumberValidator.validPhoneNumber,
        Validators.required
      ])),
      smoker: new FormControl('', Validators.compose([

      ])),
      relationship: new FormControl('', Validators.compose([

      ])),
      day: new FormControl('', Validators.compose([
        Validators.required
      ])),
      month: new FormControl('', Validators.compose([
        Validators.required
      ])),
      year: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  setMonth(month) {
    const mString = this.appGlobal.months[Number(month) - 1];
    this.month = mString;
    this.days = this.appGlobal.getDays(this.year, this.month);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.actionBtnAttempt = true;
    if(this.type == 'general') {
      if(this.formGroup.get('firstname').value && this.formGroup.get('lastname').value && this.formGroup.get('email').value && this.formGroup.get('mainphone').value && !this.formGroup.get('email').hasError('email') && !this.formGroup.get('mainphone').hasError('validPhoneNumber')) {
        this.close();
      }
    } else {
      if(this.formGroup.get('firstname').value && this.formGroup.get('lastname').value && this.formGroup.get('day').value && this.formGroup.get('month').value && this.formGroup.get('year').value) {
        this.close();
      }
    }
  }

  onChangeMonth() {
    this.days = this.appGlobal.getDays(this.year, this.month);
    if(this.day > this.days.length) this.day = '';
  }

  openMonthSelect() {
    this.monthSelect.open();
  }

  openDaySelect() {
    this.daySelect.open();
  }

  openYearSelect() {
    this.daySelect.open();
  }

  openHouseholdSelect() {
    this.householdSelect.open();
  }

  openSmokerSelect() {
    this.smokerSelect.open();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 900,
      targetHeight: 900,
      allowEdit: true,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageUrl = base64Image;
     }, (err) => {
      // Handle error
     });
  }

  disAllowNum(val: any, field: string) {
    if ( /[0-9]/.test( val ) ) {
      setTimeout(() => {
        this.data[field] = this.data[field].slice(0, -1);
      });
    }
  }

  disAllowChar(val: any, field: string) {
    if ( /[A-Za-z]/.test( val ) ) {
      setTimeout(() => {
        this.data[field] = this.data[field].slice(0, -1);
      });
    }
  }

}
