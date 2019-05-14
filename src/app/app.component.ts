import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavBaseParams } from './nav-base.params';
import { AppRoutingService } from './app-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Feature 1',
      url: 'feature1',
      icon: 'list'
    },
    {
      title: 'Feature 2',
      url: 'feature2',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appRoutingService: AppRoutingService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Called by the side menu to goto a page
   * @param {AppPageItem} pageItem - the page item to open.
   */
  public openPage(page: any): void {
    try {
     
      let params = new NavBaseParams();
      params.fromSideMenu = true;
      if (page.url != 'home') {
        this.appRoutingService.navigateForward(page.url, params);
      }
    } catch (error) {
      console.error(`openPage ${error}`);
    }
  }
}
