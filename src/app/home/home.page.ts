import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private backButtonSubscription: Subscription;

  /**
   *
   */
  constructor(private platform: Platform) {
    
    
  }

  public ionViewDidEnter(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.backButtonSubscription.unsubscribe();
      console.info('Home exiting app via back button');
      navigator['app'].exitApp();
    });
  }

  public ionViewWillLeave(): void {
    try {
      console.debug('Leaving Home');
      this.backButtonSubscription.unsubscribe();
    } catch (error) {
      console.debug(`ionViewWillLeave HomePage error: ${error}`);
    }
  }

}
