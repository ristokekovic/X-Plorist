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
    placeId;
    visited;
    found;

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

    markLocation(){
                                
       this.storage.ready().then(() => {
           this.storage.get('currentUser').then((val) => {
                if(val == null){
                    this.toast.show("You need to be logged in to do that", '5000', 'center').subscribe(
                    toast => {
                      //console.log(toast);
                    }
                 );
                } else {
                    let id;
                    let users = this.af.database.list('/users');
                    let placeId = this.place.$key;
                    let found = false;
                    let visited;
                    users.forEach(element => {
                        let index;
                        for(index = 0; index < element.length; index++){
                            if(element[index].id == val){
                                id = element[index].$key;
                                let userObj = this.af.database.object('/users/'+id);
                                userObj.forEach(tmp => {
                                    visited = tmp.visited;
                                    for (var key in visited) {
                                        if(key == placeId)
                                            found = true;
                                    }

                                    if(found){
                                        //TODO: For some reason, this toast appears after successfuly marking a place, as if the whole method is invoked again.
                                        //That needs to be checked in the future
                                        this.toast.show("You already marked this place as visited", '5000', 'center').subscribe(
                                        toast => {
                                        //console.log(toast);
                                        });
                                    } else {
                                        visited[placeId] = true;
                                        this.af.database.object('/users/'+id).update({
                                            visited: visited
                                        });
                                        this.af.database.object('/places/'+this.place.$key).update({
                                                numOfPeople: ++this.place.numOfPeople
                                        });
                                        this.toast.show("You have successfuly marked this place as visited", '5000', 'center').subscribe(
                                        toast => {
                                        //console.log(toast);
                                    });
                                  }
                                });
                            }
                        }
                    });
                }
           });
        
       });
    
    }

}
