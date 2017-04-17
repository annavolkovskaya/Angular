import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component ({
  selector: 'empty-component',
  template: `
		<div *ngIf="isDataArrayEmpty()">No data. Feel free to add new course.</div>
	`,
  styles: [`
    div {
      padding: 10px;
      background-color: #81BEF7;
      border-radius: 4px;
      color: white;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmptyComponent {
  @Input()
  public data: Object[];

  public isDataArrayEmpty() {
    return !this.data || this.data.length === 0;
  }
}
