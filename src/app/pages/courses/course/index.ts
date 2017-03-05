import {
  Component,
  OnInit
} from '@angular/core';

interface CourseObject {
  type: string;
  duration: number;
  description: string;
  date: string;
  id: number;
}

interface EditCourse {
  (id: number) : void;
}

interface DeleteCourse {
  (id: number) : boolean;
}

@Component ({
  templateUrl: './course.component.html'
})

export class CourseComponent implements OnInit {
    public ngOnInit() {
    console.log('hello Course component');
  }
}
