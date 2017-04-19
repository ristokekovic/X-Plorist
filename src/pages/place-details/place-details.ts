import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Map } from '../map/map';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-place-details',
  templateUrl: 'place-details.html',
})
export class PlaceDetails {

    place;
    places;

    constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private storage: Storage,
              private toast: Toast,
              private af: AngularFire) {
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

    savePlace(){

        let found = false;

        this.storage.ready().then(() => {

        this.storage.get('places').then((val) => {
            this.places = val;
            if(this.places == null)
                this.places = new Array();

            this.places.forEach(element => {
                    if(element.name === this.place.name){
                        this.toast.show("You already saved this place to your favourites", '5000', 'center').subscribe(
                    toast => {
                      //console.log(toast);
                    }
                 );
                        found = true;                  
                    }
                });

            if(!found){
                this.places.push(this.place);
                this.storage.set('places', this.places);
                this.toast.show("Place saved to device for offline view", '5000', 'center').subscribe(
                    toast => {
                      //console.log(toast);
                    }
                 );
            }

        })  
     });

     
    }

}
