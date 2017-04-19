import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { MapSelectPage } from '../map-select/map-select';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { HomePage } from '../home/home';



/*
  Generated class for the Add page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  image;
  places: FirebaseListObservable<any[]>;

  place = {
    name: '',
    description: ''
  }
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, private toast: Toast) {
      this.places = navParams.get('places');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  openMapSelectPage(){
    this.navCtrl.push(MapSelectPage);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Photo Source',
      buttons: [
        {
          text: 'Take Photo With Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture();
          }
        },{
          text: 'Choose Photo From Gallery',
          icon: 'images',
          handler: () => {
            this.chooseFromGallery();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.image = base64Image;
    }, (err) => {
    // Handle error
    });
  }


  chooseFromGallery(){

      const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.image = base64Image;
    console.log(base64Image);
    }, (err) => {
    // Handle error
    });

  }

  addNewPlace(){
    if(this.place.name === '' || this.place.description === ''){
      let alert = this.alertCtrl.create({
        title: 'Form Incomplete!',
        subTitle: 'You did not fill all the required fields',
        buttons: ['OK']
      });
      alert.present();
    }


    if(this.image != null){
      this.places.push({
        name: this.place.name,
        description: this.place.description,
        img: this.image,
        numOfPeople: 0
      });
    } else {
      this.places.push({
        name: this.place.name,
        description: this.place.description,
        img: 'https://media.pixilinkserver.com/default-building.png',
        numOfPeople: 0
      });
    }

    this.toast.show("New place added", '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      }
    );

    this.navCtrl.pop();
    this.navCtrl.push(HomePage);

  }

}
