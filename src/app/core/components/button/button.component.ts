import {
  Component,
  Input,
  ChangeDetectionStrategy
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
	`],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ButtonComponent {
  @Input()
  public disabled: boolean;
  @Input()
  public buttonClick: Function;
  @Input()
  public buttonText: string;
  @Input()
  protected text: string;
}
