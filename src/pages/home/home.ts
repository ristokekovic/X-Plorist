import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PlaceDetails } from '../place-details/place-details';
import { AddPage } from '../add/add';
import { FavouritesPage } from '../favourites/favourites';

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

  openAddPage(){
    this.navCtrl.push(AddPage, {places: this.places});       
  }

  openFavouritesPage(){
    this.navCtrl.push(FavouritesPage);
  }

}
