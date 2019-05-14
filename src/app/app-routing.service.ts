import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NavController } from '@ionic/angular';
import { RoutingPartsModel } from './routing-parts.model';
import { NavBaseParams } from './nav-base.params';

@Injectable({
  providedIn: 'root'
})

/**
 * Added to give the ability oif the back button to redirect to the Home page, it a main feature page has been 
 * activated via the side menu. In this case, we want to "reset" the home page as the "root", and there seems to 
 * be not "built in" way of doing this.
 * We can emulate this by monitoring the start of all navigation events, and redirecting to home when we
 * detect one feature page attempting to go to another when both were activated via the side menu
 **/
export class AppRoutingService {
  private currentNavigationForward: RoutingPartsModel;
  private rootNavigation: string;

  /**
   * Construction
   * @param navCtrl - nav controller
   * @param router - angular router
   * @param logger - logger
   */
  constructor(
    private navCtrl: NavController,
    private router: Router,

  ) {
    // Monitor NavigationStart so we can look for a back button and redirect to home
    // page if need be
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart))
      .subscribe((ev: NavigationStart) => {
        this.handlePageRouting(ev)
      });
  }

  /**
   * Main handling method
   * @param ev NavigationStart event from router
   */
  private handlePageRouting(ev: NavigationStart): void {
    try {
      if (ev.url === this.rootNavigation) {
        return;
      }

      let parts = this.extractUriParts(ev.url);
      if (this.currentNavigationForward != undefined && this.currentNavigationForward.equals(parts)) {
        //In this case we have the NavigationStart from the navigate forward
        return;
      }

      // If we get to here, we have a back button, as the navigation did not come from navigateForward
      // See if the last navigate forward was for the side menu. If so, redirect to home and reset
      if (this.currentNavigationForward == undefined || this.currentNavigationForward.params == undefined) {
        return;
      };

      if (parts.url == '/home') {
        this.currentNavigationForward = undefined;
        this.navigateRoot = undefined;
        return;
      }

      if (this.currentNavigationForward.params.fromSideMenu) {
        this.currentNavigationForward = undefined;
        this.navigateRoot = undefined;
        
        this.router.navigateByUrl('/home');
      }
    } catch (error) {
      console.error(`RoutingMonitorService.handlePageRouting: ${error}`);
    }
  }

  /**
   * Override of navigateRoot
   * @param url url to navigate to
   */
  public navigateRoot(url: string): void {
    this.currentNavigationForward = undefined;
    this.rootNavigation = url;
    this.navCtrl.navigateRoot(url);
  }

  /**
   * * Override of navigateForward
   * @param url  - url to navigate to 
   * @param params - optional parameters
   */
  public navigateForward(url: string, params: NavBaseParams): void {
    this.currentNavigationForward = new RoutingPartsModel(url, params);
    this.rootNavigation = undefined;
    if (params != undefined) {
      let json = JSON.stringify(params);
      this.navCtrl.navigateForward(`${url}/${json}`);
    } else {
      this.navCtrl.navigateForward(url);
    }
  }

  /**
   * Extract parts from incoming url
   * @param uri - incoming url string
   */
  private extractUriParts(uri: string): RoutingPartsModel {
    let parts = uri.split('/');
    if (parts[0] == "")
      parts.shift();

    let params: NavBaseParams;
    if (parts.length > 1 && parts[1] != "") {
      let json = decodeURI(parts[1]);
      params = JSON.parse(json) as NavBaseParams
    }
    return new RoutingPartsModel(parts[0], params);
  }
}
