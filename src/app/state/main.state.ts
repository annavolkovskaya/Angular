import { CourseObject } from '../models/course.model';

export interface State {
  isLoggedIn: boolean;
  username: string;
  currentPage: number;
  courses: CourseObject[];
  totalNumber: number;
  searchQuery: string;
  isSpinnerShown: boolean;
  coursesNeedUpdate: boolean;
  addCourseMode: boolean;
  currentCourse: CourseObject;
  editCourseMode: boolean;
};

export const intitialState: State = {
  isLoggedIn: false,
  username: '',
  currentPage: 0,
  courses: [],
  totalNumber: 0,
  searchQuery: '',
  isSpinnerShown: false,
  coursesNeedUpdate: false,
  addCourseMode: false,
  currentCourse: null,
  editCourseMode: false
};
