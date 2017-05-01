import { AuthorObject } from './author.model';

export interface CourseObject {
  authors: AuthorObject[];
  title: string;
  duration: number;
  description: string;
  date: string;
  id: number;
  topRated: Boolean;
}

export interface EditCourse {
  (id: number) : void;
}

export interface DeleteCourse {
  (id: number) : boolean;
}
