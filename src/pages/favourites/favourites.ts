import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FavouritesDetailsPage } from '../favourites-details/favourites-details';

/*
  Generated class for the Favourites page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html'
})
export class FavouritesPage {

  places;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
     
  }

  ngOnInit(){
      this.storage.get('places').then((val) => {
       this.places = val;
     });
  }

  onSelect(place){
    this.navCtrl.push(FavouritesDetailsPage, { place: place });
  }


}
