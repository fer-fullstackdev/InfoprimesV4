import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Select } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobals } from '../../shared/app.globals';
import { Http, Headers } from '@angular/http';
import { UserProvider } from '../../providers/user/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'app-mortgage-loan-edit',
  templateUrl: './mortgage-loan-edit.page.html',
  styleUrls: ['./mortgage-loan-edit.page.scss'],
})
export class MortgageLoanEditPage implements OnInit {
  formGroup: FormGroup;
  @ViewChild('loanTypeSelect') loanTypeSelect: Select;
  @ViewChild('percentSelect') percentSelect: Select;
  @ViewChild('monthSelect') monthSelect: Select;
  @ViewChild('daySelect') daySelect: Select;
  @ViewChild('yearSelect') yearSelect: Select;
  @ViewChild('borrowersSelect') borrowersSelect: Select;

  private headers: Headers;
  public action: string;
  public title: string;
  public data: any;
  public type: string;
  public insurance: string;
  public amount: string;
  public duration: string;
  public monthly: string;
  public institution: string;
  public year: string;
  public month: string;
  public day: string;
  public days: any;
  public borrowers: Array<any> = [];
  public borrower: any;
  public actionBtnAttempt: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private translate: TranslateService,
              private http: Http,
              public appGlobal: AppGlobals,
              private userService: UserProvider) {
    this.action = this.navParams.get('action');
    this.data = this.navParams.get('data');
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.init();
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      type: new FormControl('', Validators.compose([

      ])),
      institution: new FormControl('', Validators.compose([

      ])),
      insurance: new FormControl('', Validators.compose([

      ])),
      amount: new FormControl('', Validators.compose([
        Validators.required
      ])),
      duration: new FormControl('', Validators.compose([

      ])),
      day: new FormControl('', Validators.compose([

      ])),
      month: new FormControl('', Validators.compose([

      ])),
      year: new FormControl('', Validators.compose([

      ])),
      monthly: new FormControl('', Validators.compose([
        Validators.required
      ])),
      borrower: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MortgageLoanEditPage');
  }

  init() {
    if(this.action == 'add') {
      this.translate.get('INSURANCE_REV.NEW_MORTGAGE_LOAN', {}).subscribe((res: string) => {
        this.title = res;
      });
    } else {
      this.translate.get('INSURANCE_REV.EDIT_MORTGAGE_LOAN', {}).subscribe((res: string) => {
        this.title = res;
      });
      this.type = this.data.type;
      this.insurance = this.data.insurance;
      this.amount = this.data.amount;
      this.duration = this.data.duration;
      this.monthly = this.data.monthly;
      this.institution = this.data.institution;
      this.year = this.data.renewal_date.split('-')[0];
      this.setMonth(this.data.renewal_date.split('-')[1]);
      this.day = this.data.renewal_date.split('-')[2];
      this.borrower = JSON.parse(this.data.titulaire);
    }
    this.days = this.appGlobal.getDays(this.year, this.month);
    this.getContacts();
  }

  setMonth(month) {
    const mString = this.appGlobal.months[Number(month) - 1];
    this.month = mString;
  }

  getContacts() {
    var that  = this;
    _.forEach(this.userService.mainData, function(obj) {
      that.borrowers.push({
        id: obj.id,
        fullname: obj.firstname + ' ' + obj.lastname
      });
    });

    _.forEach(this.userService.coapplicantData, function(obj) {
      that.borrowers.push({
        id: obj.id,
        fullname: obj.firstname + ' ' + obj.lastname
      });
    });

    _.forEach(this.userService.otherData, function(obj) {
      that.borrowers.push({
        id: obj.id,
        fullname: obj.firstname + ' ' + obj.lastname
      });
    });
  }

  onChangeMonth() {
    this.days = this.appGlobal.getDays(this.year, this.month);
    if(this.day > this.days.length) this.day = '';
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.actionBtnAttempt = true;
    if(!this.formGroup.get('amount').hasError('required') && !this.formGroup.get('monthly').hasError('required') && !this.formGroup.get('borrower').hasError('required')) {
      this.close();
    }
  }

  openLoanTypeSelect() {
    this.loanTypeSelect.open();
  }

  openPercentSelect() {
    this.percentSelect.open();
  }

  openBorrowersSelect() {
    this.borrowersSelect.open();
  }

  openMonthSelect() {
    this.monthSelect.open();
  }

  openDaySelect() {
    this.daySelect.open();
  }

  openYearSelect() {
    this.yearSelect.open();
  }

}
