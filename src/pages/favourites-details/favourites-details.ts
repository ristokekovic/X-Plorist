import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Map } from '../map/map';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

import { FavouritesPage } from '../favourites/favourites';

/*
  Generated class for the FavouritesDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favourites-details',
  templateUrl: 'favourites-details.html'
})
export class FavouritesDetailsPage {

  place;
  places;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
        private toast: Toast) {
          this.place = navParams.get('place');
        }

  showMap(place){
        this.navCtrl.push(Map, { place: place });
    }

  removePlace(){
     this.storage.ready().then(() => {

        this.storage.get('places').then((val) => {
          this.places = val;
          this.places.forEach(element => {
            if(element.name == this.place.name){
              this.places.splice(this.places.indexOf(element), 1);
              this.toast.show("This place has been removed from your favourites", '5000', 'center').subscribe(
                    toast => {
                      //console.log(toast);
                    }
                 );
            }
          });
          this.storage.set('places', this.places);
          this.navCtrl.pop();
          this.navCtrl.pop();
          this.navCtrl.push(FavouritesPage);
        });
     });
  }

}
