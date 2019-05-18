import { Component, OnInit } from '@angular/core';
import { AppRoutingService } from '../app-routing.service';
import { NavBaseParams } from '../nav-base.params';

@Component({
  selector: 'app-feature1',
  templateUrl: './feature1.page.html',
  styleUrls: ['./feature1.page.scss'],
})
export class Feature1Page implements OnInit {

  constructor(private appRoutingService: AppRoutingService) { }

  public openPage(url: string): void {
    this.appRoutingService.navigateForward(url, new NavBaseParams());
  }

  ngOnInit() {
  }

}
