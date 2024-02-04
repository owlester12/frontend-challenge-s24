import courses_data from  '../data/courses.json'
import TheCourse from './TheCourse';
import { Course } from '../interfaces';
import {useSelector} from 'react-redux'
import { RootState } from "../redux/store";
import Fuse from 'fuse.js';
import React from 'react';

const Courses = () => {

  const courses:Course[] = courses_data
  const {filter, prereq, prereqInclude} = useSelector((state: RootState) => state.cart);
  const {theSearch} = useSelector((state: RootState) => state.cart)
  const options = {
    keys : ['dept', 'description', 'title', 'number'],
    findAllMatches: true,
    threshold: 0.4,
    ignoreLocation: true,
    sortFn: (item:any) => item.number,
    includeScore: true
  }
  const fuse = new Fuse(courses_data, options);
  const result = fuse.search<Course>(theSearch);
  const rest: Course[]= result.map((item) => (item.item))
  //filters courses according to filters and search input

  const filts = (entry: Course) => {
    return ((filter[0] && entry.number >= 100 && entry.number < 200 )
    || (filter[1] && entry.number >= 200 && entry.number <300)
    || (filter[2] && entry.number >= 300 && entry.number < 400) 
    || (filter[3] && entry.number >= 400 && entry.number < 500)
    ) && ((
      prereqInclude && (
        (prereq[0] && entry.prereqs?.includes("CIS 120") ) ||
        (prereq[1] && entry.prereqs?.includes("CIS 121") ) ||
        (prereq[2] && entry.prereqs?.includes("CIS 160") ) ||
        (prereq[3] && entry.prereqs?.includes("CIS 240") ) ||
        (prereq[4] && entry.prereqs?.includes("CIS 262") )
        ) ||(!prereq[0] && !prereq[1] && !prereq[2] && !prereq[3] && !prereq[4] && !entry.prereqs))
      || (
        !prereqInclude &&(
        !(prereq[0] && entry.prereqs?.includes("CIS 120") ) &&
        !(prereq[1] && entry.prereqs?.includes("CIS 121") ) &&
        !(prereq[2] && entry.prereqs?.includes("CIS 160") ) &&
        !(prereq[3] && entry.prereqs?.includes("CIS 240") ) &&
        !(prereq[4] && entry.prereqs?.includes("CIS 262") )

      )));

  }



  const filtCourse = result.filter(function(entrys){
    const entry:Course = entrys.item
    return filts(entry);
  })

  const noSearch = courses_data.filter((entry) => {
    return filts(entry);
})



  return (
  <div className = "ml-[10px] ">
    {theSearch !== ""  && theSearch !== " "  &&
    <div className = "text-[12px]">Showing results for <q>{theSearch}</q> </div>}
    {theSearch !== "" && theSearch !== " " && filtCourse.map((value) => (

      <TheCourse key = {value.item.number} course = {value.item} />
      
    ))}
    {(theSearch === "" || theSearch === " ") && noSearch.map((value) => (
      <TheCourse   key = {value.number} course = {value} />
    ))
    }
  </div>);
}

export default Courses;