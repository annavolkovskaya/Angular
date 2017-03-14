import {
  Component,
  Input
} from '@angular/core';

@Component ({
  selector: 'button-component',
  template: `
		<button (click)="buttonClick(text)">{{buttonText}}</button>
	`,
  styles: [`
		button {
			cursor: pointer;
			display: block;
		}
	`]
})

export class ButtonComponent {
  @Input()
  public buttonClick: Function;
  @Input()
  public buttonText: string;
  @Input()
  protected text: string;
}
