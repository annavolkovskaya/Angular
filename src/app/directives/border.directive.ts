import { Directive, ElementRef, Input, Renderer, OnInit } from '@angular/core';
import { CourseObject } from '../models/course.model';

@Directive({ selector: '[myBorder]' })
export class BorderDirective implements OnInit {

  @Input() public courseData: CourseObject;

  constructor(private elem: ElementRef, private renderer: Renderer) { }

  public ngOnInit() {
    const currentDate: Date = new Date();
    const currentDateInSeconds = Date.parse(currentDate.toString());
    const creationDateInSeconds = Date.parse(this.courseData.date.toString());
    const millisecondInDay = 86400 * 1000;
    const daysDifference = millisecondInDay * 14;
    let borderColor;
    if (creationDateInSeconds < currentDateInSeconds &&
        creationDateInSeconds >= (currentDateInSeconds - daysDifference)) {
      borderColor = 'green';
    } else if (creationDateInSeconds > currentDateInSeconds) {
      borderColor = 'blue';
    } else { borderColor = 'black'; }
    this.renderer.setElementStyle(this.elem.nativeElement, 'border-color', borderColor);
  }
}
