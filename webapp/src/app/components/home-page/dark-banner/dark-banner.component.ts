import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dark-banner',
  templateUrl: './dark-banner.component.html',
  styleUrls: ['./dark-banner.component.css']
})
export class DarkBannerComponent implements OnInit {
  isBannerVisible: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  hideBanner() {
    this.isBannerVisible = false;
  }
}
