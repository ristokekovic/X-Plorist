import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PlaceDetails } from '../pages/place-details/place-details';
import { Map } from '../pages/map/map';
import { AddPage } from '../pages/add/add';
import { MapSelectPage } from '../pages/map-select/map-select';
import { FavouritesPage } from '../pages/favourites/favourites';
import { FavouritesDetailsPage } from '../pages/favourites-details/favourites-details';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { Facebook } from '@ionic-native/facebook';

import { IonicStorageModule } from '@ionic/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyAebh7K0NjmhuBbeNspbqIBsr5es0t2xRE",
    authDomain: "x-plorist.firebaseapp.com",
    databaseURL: "https://x-plorist.firebaseio.com",
    projectId: "x-plorist",
    storageBucket: "x-plorist.appspot.com",
    messagingSenderId: "525593788976"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PlaceDetails,
    Map,
    AddPage,
    MapSelectPage,
    FavouritesPage,
    FavouritesDetailsPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PlaceDetails,
    Map,
    AddPage,
    MapSelectPage,
    FavouritesPage,
    FavouritesDetailsPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Camera,
    Toast,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
