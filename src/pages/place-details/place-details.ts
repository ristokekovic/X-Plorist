import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Map } from '../map/map';

@Component({
  selector: 'page-place-details',
  templateUrl: 'place-details.html',
})
export class PlaceDetails {

  place;

    constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController) {
                this.place = navParams.get('place');
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    done() {
        this.viewCtrl.dismiss();
    }

    showMap(place){
        this.navCtrl.push(Map, { place: place });
    }

}
