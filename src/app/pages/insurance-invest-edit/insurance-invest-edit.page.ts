import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, Select } from '@ionic/angular';
import { Http, Headers } from '@angular/http';
import * as _ from 'lodash';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insurance-invest-edit',
  templateUrl: './insurance-invest-edit.page.html',
  styleUrls: ['./insurance-invest-edit.page.scss'],
})
export class InsuranceInvestEditPage implements OnInit {
  formGroup: FormGroup;
  @ViewChild('typeSelect') typeSelect: Select;

  private headers: Headers;
  public action: string;
  public data: any;
  public type: string;
  public company: string;
  public capital: string;
  public monthlyPayment: number;
  public duration: any;
  public policyholder: any;
  public policyholders: Array<any> = [];
  public selectOpts: any;
  public actionBtnAttempt: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              public viewCtrl: ViewController,
              private userService: UserService) {
    this.action = this.navParams.get('action');
    this.data   = this.navParams.get('data');
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsuranceInvestEditPage');
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
      company: new FormControl('', Validators.compose([
        Validators.required
      ])),
      capital: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  init() {
    var that  = this;

    if(this.action == 'edit') {
      this.type = this.data.type;
      this.company = this.data.company;
      this.capital = this.data.capital;
      this.monthlyPayment = this.data.premium ? this.data.premium : 0;
      this.duration = this.duration ? this.duration : 0;
    }

    _.forEach(this.userService.mainData, function(obj) {
      that.policyholders.push({
        id: obj.id,
        fullname: obj.firstname + ' ' + obj.lastname
      });
    });

    _.forEach(this.userService.coapplicantData, function(obj) {
      that.policyholders.push({
        id: obj.id,
        fullname: obj.firstname + ' ' + obj.lastname
      });
    });

    _.forEach(this.userService.otherData, function(obj) {
      that.policyholders.push({
        id: obj.id,
        fullname: obj.firstname + ' ' + obj.lastname
      });
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.actionBtnAttempt = true;
    if(!this.formGroup.get('type').hasError('required') && !this.formGroup.get('company').hasError('required') && !this.formGroup.get('capital').hasError('required')) {
      this.close();
    }
  }

}
