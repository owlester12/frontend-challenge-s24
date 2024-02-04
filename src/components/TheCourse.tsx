import {useEffect, useState} from 'react';
import { Course } from '../interfaces';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch } from 'react-redux';
import { addPrimCart, delPrimCart, addAltCart, delAltCart } from '../redux/cart';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../redux/store';
import { DataArraySharp } from '@mui/icons-material';
import React from 'react';

interface theCourseProps{
    course: Course
}

const TheCourse:React.FC<theCourseProps> = ({course}) => {


    const [isShown, setIsShown] = useState(false);
    const dispatch = useDispatch();
    const {primCart, isPrimCart, altCart, description} = useSelector((state: RootState) => state.cart);
    const limit = primCart.length < 7

    const controller = new AbortController();

    const [result, setResults] = useState<any>([]);
    const requestOptions = {
      'content-type': 'application/json',
       method: 'GET',
       redirect: 'follow'
     };

    useEffect(() => {
      async function getData(){
        await fetch('/api/base/2022A/courses/'+ course.dept + "-" + course.number.toString() +  '/').then( res => 
          {
          const data = res.json()
          console.log(data);
          return data;
        }).then(setResults);
      }
      getData();
    }, [])

    //makes sure delete cart deletes from correct cart
    const delCart = (course: number) => {
      if(isPrimCart){
        dispatch(delPrimCart(course))
      } else {
        dispatch(delAltCart(course))
      }
    }

     //makes sure add cart adds to correct cart
    const addCart = (course: Course) => {
      if(isPrimCart){
        dispatch(addPrimCart(course))
      } else {
        dispatch(addAltCart(course))
      }
    } 
    const theCart = isPrimCart ? primCart : altCart 
    const inCart = theCart.map((a) => a.number).includes(course.number)

    const  pickDifficulty =  (inp:number) => {
      if (inp >= 3){
        return "#ffc107"
      } else if(inp >= 2){
        return "#6274f1"
      } else{
        return "#76bf96"
    }
  }
  const pickQuality = (inp: number) => {
    if (inp >= 3){
      return "#76bf96"
    } else if(inp >= 2){
      return "#6274f1"
    } else{
      return "#ffc107"
  }

  }


    return( 
    <div className = 'plaque duration-100 box-border m-5 rounded-lg border-transparent border-opacity-10 p-[10px] border-[1px] hover:border-gray-500 bg-white' onClick = {() => setIsShown(!isShown)}>
      <div className = "header justify-between flex items-center">
      <div className = 'courseHead' onClick = {() => setIsShown(!isShown)} >
        <div className = 'courseID'>

          {course.dept} {' '} {course.number} 

        </div>
        <div className = 'title'> {course.title} </div>
        
      </div>
      <div>
        {!inCart && limit && <button className = "rounded-[10px] scale-[1.3] text-[#9c0404] font-bold cursor-poiter mr-[10px] "
                            onClick={() => addCart(course)}> <AddCircleIcon /> </button>}   
        {inCart && <button className = "remBut cursor-pointer scale-[1.3] mr-[10px]" onClick={() => delCart(course.number)}><RemoveCircleIcon/></button>}
      </div>
    </div>
    
      {((isShown && description !== 2) || description === 1) && <div className = "text-[13px]" >  {course.description} </div>}
      {((isShown && description !== 2) || description === 1) && (course["prereqs"] !== undefined) && Array.isArray(course["prereqs"]) && <div className = 'text-[13px]'> Prerequisites: {course["prereqs"]?.join(", ")} </div>}
      {((isShown && description !== 2) || description === 1) && (course["cross-listed"] !== undefined) && <div className = 'text-[13px]'> Also offered as: {course["cross-listed"]?.join(", ")}</div>}
      {((isShown && description !== 2) || description === 1) && Object.prototype.hasOwnProperty.call(result, 'difficulty') &&
      <div className = 'flex flex-row gap-5 text-[13px] mt-2'>
        <div className = "flex flex-col">Course: 
        <div>
          <div className = {` relative p-2 inline-block mt-1 rounded-md overflow-hidden text-white` } style = {{"background" : pickQuality(Math.round(result.course_quality*10)/10) }}> {Math.round(result.course_quality*10)/10}
          </div> 
          </div>
        </div>
        <div className = "flex flex-col">Difficulty: 
        <div>
        <div className = {`p-2 rounded-md mt-1 inline-block text-white`} style = {{"background" : pickDifficulty(Math.round(result.difficulty*10)/10) }}> {Math.round(result.difficulty*10)/10}
          </div> 
          </div>
        </div> 
        <div className = "flex flex-col">Instructor:
        <div>
          <div className = {`p-2 rounded-md mt-1 inline-block text-white`}  style = {{"background" : pickQuality(Math.round(result.instructor_quality*10)/10) }} > {Math.round(result.instructor_quality*10)/10}
          </div> 
          </div>
  
      </div>    
    </div>}
    </div>);
  }

  export default TheCourse;