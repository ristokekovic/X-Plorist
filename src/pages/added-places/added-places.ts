import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddedPlaces page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-added-places',
  templateUrl: 'added-places.html',
})
export class AddedPlaces {

  allPlaces: FirebaseListObservable<any[]>;
  places;
  user;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private af: AngularFire,
              private storage: Storage) {
  
    
  }

  ngOnInit(){
      this.allPlaces = this.af.database.list('/places');
      this.places = [];

      this.storage.ready().then(() => {
      this.storage.get('currentUser').then((val) => {
          this.user = val;

          this.allPlaces.forEach(element => {
                            let index;
                            for(index = 0; index < element.length; index++){
                                if(element[index].addedBy == this.user){
                                  this.places.push(element[index]);
                                }
                            }
          });
        });
      });

      
  }

}
