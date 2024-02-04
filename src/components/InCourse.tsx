import { Course } from "../interfaces"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import { RootState } from "../redux/store";
import { delPrimCart, delAltCart } from "../redux/cart";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import React from 'react';

interface inCourseProps{
    course: Course
    index: number
}

const InCourse:React.FC<inCourseProps> = ({course, index}) =>{

  const dispatch = useDispatch();
  const {isPrimCart} = useSelector((state: RootState) => state.cart);

  //makes sure delete cart deletes from correct cart
  const delCart = (course: number) => {
    if(isPrimCart){
      dispatch(delPrimCart(course))
    } else {
      dispatch(delAltCart(course))
    }
  }


    return( 
    <Draggable key = {course.number} draggableId = {course.number.toString()} index= {index}>
      {(provided) => (
        <div {...provided.draggableProps} ref = {provided.innerRef} {...provided.dragHandleProps}
        className = ' border-[1px] border-transparent hover:border-gray-700 border-opacity-10 p-[10px] bg-white m-3 duration-0 plaque rounded-md flex justify-between'>
          <div>
          <div className = 'courseHead' >
            <div className = 'courseID'>
              <button className = "remBut cursor-pointer mr-[10px]" onClick={() =>delCart(course.number)}><RemoveCircleIcon/></button>
              
              {(index + 1).toString() + ".   "}  {course.dept} {' '} {course.number}
            </div>
            <div className = 'title'> {course.title} </div>
          </div>
          </div>
          <DragIndicatorIcon className = "opacity-60"/>
        </div>

   
      )}
    </Draggable>);
}
export default InCourse;