import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the MapSelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map-select',
  templateUrl: 'map-select.html'
})
export class MapSelectPage {

  constructor(public navCtrl: NavController, NavParams: NavParams, platform: Platform, private geolocation: Geolocation) {

    platform.ready().then(() => {
            
            let map = new GoogleMap('map');

            this.geolocation.getCurrentPosition().then((resp) => {
                 // create LatLng object
                  let ionic: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);

                  // create CameraPosition
                  let position: CameraPosition = {
                  target: ionic,
                  zoom: 18,
                  tilt: 30
                  };

                  // move the map's camera to position
                  map.moveCamera(position);

                  // create new marker
                  let markerOptions: MarkerOptions = {
                  position: ionic,
                  title: 'You are here!'
                  };

                  map.addMarker(markerOptions)
                  .then((marker: Marker) => {
                      marker.showInfoWindow();
                  });
                  
              }).catch((error) => {
                console.log('Error getting location', error);
              });
        });

  }



}
