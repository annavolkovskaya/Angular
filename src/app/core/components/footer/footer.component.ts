import {
  Component,
  Input
} from '@angular/core';

@Component ({
  selector: 'footer-component',
  template: `
		<div>copyright 2017</div>
	`,
  styles: [`
		div {
			border: 1px solid black;
			bottom: 10px;
			left: 50px;
			padding: 5px 0;
			position: fixed;
			right: 50px;
			text-align: center;
		}
	`]
})

export class FooterComponent {
}
