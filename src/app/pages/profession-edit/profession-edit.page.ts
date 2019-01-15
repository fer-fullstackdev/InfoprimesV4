import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, Select } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profession-edit',
  templateUrl: './profession-edit.page.html',
  styleUrls: ['./profession-edit.page.scss'],
})
export class ProfessionEditPage implements OnInit {
  formGroup: FormGroup;
  @ViewChild('employmentSelect') employmentSelect: Select;
  public data: any;
  public detailData: any;
  public company: string;
  public jobTitle: string;
  public salary: string;
  public income: string;
  public actionBtnAttempt: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.data = this.navParams.get('data');
    this.detailData = this.data.details.data;
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessionEditPage');
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      company: new FormControl('', Validators.compose([

      ])),
      jobTitle: new FormControl('', Validators.compose([

      ])),
      salary: new FormControl('', Validators.compose([
        Validators.required
      ])),
      income: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  init() {
    this.company = this.detailData.employer;
    this.jobTitle = this.detailData.profession;
    this.salary = this.detailData.salary;
    this.income = this.detailData.other_gross_income;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.actionBtnAttempt = true;
    if(!this.formGroup.get('salary').hasError('required') && !this.formGroup.get('income').hasError('required')) {
      this.close();
    }
  }

  openEmployeeSelect() {
    this.employmentSelect.open();
  }

}
