
import { Component } from '@angular/core';
import { NavParams, ViewController, Platform } from 'ionic-angular';
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

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class Map {

    place;

    constructor(NavParams: NavParams, platform: Platform, private geolocation: Geolocation){
        this.place = NavParams.get("place");
        platform.ready().then(() => {

            // create LatLng object
            let ionic: LatLng = new LatLng(this.place.latitude,this.place.longitude);
            
            let map = new GoogleMap('map');

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
            title: this.place.name
            };

            map.addMarker(markerOptions)
            .then((marker: Marker) => {
                marker.showInfoWindow();
            });
            
        });
       
    }
}