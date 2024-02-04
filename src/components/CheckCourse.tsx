
import { Course } from "../interfaces";
import React from 'react';

interface checkCourseProps{
    course: Course
    index: number
}
const CheckCourse:React.FC<checkCourseProps> = ({course, index}) => {


    return( 
    <div className = 'py-[10px]'>
      <div className = 'courseHead' >
        <div className = 'courseID'>
          {(index + 1).toString() + ".   "}  {course.dept} {' '} {course.number}
        </div>
        <div className = 'title'> {course.title} </div>
      </div>
      <div className = "description" > {course.description} </div>
      {(course["prereqs"] !== undefined) && 
      <div className = 'description'> Prerequisites: {course["prereqs"]} </div>}
      
      {(course["cross-listed"] !== undefined) && 
      <div className = 'description'> Also offered as: {course["cross-listed"]?.join(", ")}</div>}
           
    </div>);
  }

export default CheckCourse;