import {useSelector} from 'react-redux'
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setDescription } from "../redux/cart";
import React from 'react';


const Description = () => {
    const {description} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const descripts: [string, number][] = [["Show on click", 0], ["Show all", 1], ["Hide all", 2]]



    return (
    <div className = "">
        <div className='flex justify-between  p-2 pb-0 cursor-pointer'>
            <div className = "font-bold" > Description: </div>
        </div>
        <div className = "ml-[20px]">
        {
            descripts.map((item) => ( 
                <div key = {item[0]} className = "flex flex-row m-[4px] ">
                <div className = {`h-[16px] min-w-[16px]  border-black border-[1px] rounded-full mx-2 my-[2px] cursor-pointer ${description === item[1] ? "bg-red-700" : "bg-white"}`} onClick={() => dispatch(setDescription(item[1]))}>
                </div>
                <div className = 'relative top-0 cursor-pointer text-[13px]' onClick={() => dispatch(setDescription(item[1]))}>
                    {item[0]}
                </div>
            </div>
            ))
        }
        </div>

    </div>

  )
}

export default Description