import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component ({
  selector: 'star-component',
  template: `
		<div *ngIf="isShown">&#x2606;</div>
	`,
  styles: [`
    div {
      color: yellow;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StarComponent {
  @Input()
  public isShown: Boolean;
}
