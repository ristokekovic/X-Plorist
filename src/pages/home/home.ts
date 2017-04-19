import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PlaceDetails } from '../place-details/place-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  places: FirebaseListObservable <any[]>;

  constructor(public navCtrl: NavController,
              private af: AngularFire) {

  }

  ngOnInit(){
      this.places = this.af.database.list('/places');
  }

  onSelect(place){
    this.navCtrl.push(PlaceDetails, { place: place });
  }

}
