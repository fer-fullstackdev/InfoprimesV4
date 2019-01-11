import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'page-reclamation',
  templateUrl: 'reclamation.html',
})
export class ReclamationPage {
  public lifeItemClicked: boolean = false;
  public disabilityItemClicked: boolean = false;
  public longTemrCareItemClicked: boolean = false;
  public criticalItemClicked: boolean = false;
  public travelItemClicked: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamationPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  itemClick(type: string) {
    switch(type) {
      case 'life':
        this.lifeItemClicked = !this.lifeItemClicked;
        this.longTemrCareItemClicked = false;
        this.disabilityItemClicked = false;
        this.criticalItemClicked = false;
        this.travelItemClicked = false;
        break;
      case 'disability':
        this.disabilityItemClicked = !this.disabilityItemClicked;
        this.longTemrCareItemClicked = false;
        this.lifeItemClicked = false;
        this.criticalItemClicked = false;
        this.travelItemClicked = false;
        break;
      case 'longtermcare':
        this.longTemrCareItemClicked = !this.longTemrCareItemClicked;
        this.disabilityItemClicked = false;
        this.lifeItemClicked = false;
        this.criticalItemClicked = false;
        this.travelItemClicked = false;
        break;
      case 'critical':
        this.criticalItemClicked = !this.criticalItemClicked;
        this.longTemrCareItemClicked = false;
        this.lifeItemClicked = false;
        this.disabilityItemClicked = false;
        this.travelItemClicked = false;
        break;
      case 'travel':
        this.travelItemClicked = !this.travelItemClicked;
        this.longTemrCareItemClicked = false;
        this.lifeItemClicked = false;
        this.criticalItemClicked = false;
        this.disabilityItemClicked = false;
        break;
      default:
        break;
    }
  }
}