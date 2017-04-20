import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PlaceDetails } from '../place-details/place-details';
import { AddPage } from '../add/add';
import { FavouritesPage } from '../favourites/favourites';
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user;

  places: FirebaseListObservable <any[]>;

  constructor(public navCtrl: NavController,
              private af: AngularFire,
              private storage: Storage,
              private toast: Toast) {

  }

  ngOnInit(){
      this.places = this.af.database.list('/places');
  }

  onSelect(place){
    this.navCtrl.push(PlaceDetails, { place: place });
  }

  openAddPage(){
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((val) => {
        this.user = val;
        if(this.user != null){
          this.navCtrl.push(AddPage, {places: this.places});
        } else {
          this.toast.show("You are not logged in", '5000', 'center').subscribe(
                    toast => {
                        //console.log(toast);
                    }
                );
        }
      });
    });
  }

  openFavouritesPage(){
    this.navCtrl.push(FavouritesPage);
  }

  openLoginPage(){
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((val) => {
        this.user = val;
        if(this.user != null){
          this.toast.show("You are already logged in", '5000', 'center').subscribe(
                    toast => {
                      //console.log(toast);
                    }
                 );
        } else {
          this.navCtrl.push(LoginPage);
        }
      });
    });
  }

  logout(){
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((val) => {
          this.user = val;
          if(this.user != null){
            this.storage.remove('currentUser');
            this.toast.show("You have logged out", '5000', 'center').subscribe(
                    toast => {
                      //console.log(toast);
                    }
                 );
          } else {
            this.toast.show("You are not logged in", '5000', 'center').subscribe(
                    toast => {
                      //console.log(toast);
                    }
                 );
          }
      });
    });
  }

}
