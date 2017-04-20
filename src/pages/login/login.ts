import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

import { HomePage } from '../home/home';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  users;

  constructor(private af: AngularFire, 
              private fb: Facebook, 
              //private twitter: TwitterConnect, 
              public navCtrl: NavController, 
              private storage: Storage, 
              private toast: Toast, 
              public navParams: NavParams) {
    this.users = this.af.database.list('/users');

    
  }


  facebookLogin(){
    let found = false;

    this.storage.ready().then(() => {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {

      this.users.forEach((element) => {
      let index;
      for(index = 0; index < element.length; index++){
        if(element[index].id == res.authResponse.userID){
          found = true;
        }
      }


      if(!found){
         this.users.push({
          id: res.authResponse.userID,
          visited: []
        });
      }

    });

    

      
      this.storage.set('currentUser', res.authResponse.userID);
      //console.log(this.storage.get('currentUser'));
      

      this.toast.show("You have successfuly logged in", '5000', 'center').subscribe(
                    toast => {
                      //console.log(toast);
                    }
                 );
      this.navCtrl.pop();
          
    })
    .catch(e => console.log('Error logging into Facebook', e));
    });
  }

  /*twitterLogin(){
    this.twitter.login().then((response) => {
      let found = false;
      this.users.forEach(element => {
        if(this.users.id == response.userId){
          found = true;
        }
      });

      if(!found){
         this.users.push({
          id: response.userId,
          visited: []
        });
      }

      this.storage.ready().then(() => {
        this.storage.set('currentUser', response.userId);
        console.log(this.storage.get('currentUser'));
      });

      this.toast.show("You have successfuly logged in", '5000', 'center');
      this.navCtrl.pop();
    });
  }*/


}
