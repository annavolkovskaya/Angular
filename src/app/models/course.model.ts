export interface CourseObject {
  title: string;
  duration: number;
  description: string;
  creationDate: string;
  id: number;
  topRated: Boolean;
}

export interface EditCourse {
  (id: number) : void;
}

export interface DeleteCourse {
  (id: number) : boolean;
}
