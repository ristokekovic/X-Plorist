import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
              private iab: InAppBrowser,
              private browserTab: BrowserTab) {

  }


  openLink(link){

    this.browserTab.isAvailable()
    .then((isAvailable: boolean) => {

        if (isAvailable) {
          this.browserTab.openUrl(link);
        } else {
          // open URL with InAppBrowser instead or SafariViewController
          const browser = this.iab.create(link);
          browser.close();
        }

      
    });

  }

}
