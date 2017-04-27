import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PlaceDetails } from '../place-details/place-details';
import { AddPage } from '../add/add';
import { FavouritesPage } from '../favourites/favourites';
import { LoginPage } from '../login/login';
import { AddedPlaces } from '../added-places/added-places';

import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { LoadingController } from 'ionic-angular';

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
              private toast: Toast,
              public loadingCtrl: LoadingController) {


  }

  ngOnInit(){
      this.places = this.af.database.list('/places');
      this.presentLoading();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
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

  openAddedPlacesPage(){
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((val) => {
        this.user = val;
        if(this.user != null){
          this.navCtrl.push(AddedPlaces);
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
