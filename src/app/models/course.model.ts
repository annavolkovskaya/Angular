export interface CourseObject {
  type: string;
  duration: number;
  description: string;
  date: string;
  id: number;
}

export interface EditCourse {
  (id: number) : void;
}

export interface DeleteCourse {
  (id: number) : boolean;
}
