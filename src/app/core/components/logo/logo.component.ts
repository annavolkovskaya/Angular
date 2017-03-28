import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component ({
  selector: 'logo-container',
  styleUrls: ['./logo.component.css'],
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LogoComponent {
}
