import {
  Component,
  Input
} from '@angular/core';

import { SpinnerService } from '../../../services/spinner.service';

@Component ({
  selector: 'spinner',
  styleUrls: ['./spinner.component.css'],
  template: `<div class="load-container" *ngIf="isShown">
  <div class="loader">Loading...</div>
  </div>`
})

export class SpinnerComponent {
  @Input()
  public isShown: boolean;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.spinnerIsShowed.subscribe((value) => {
      this.isShown = value;
    });
  }
}
