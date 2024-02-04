import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {useSelector} from 'react-redux'
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setFilter, setPrereq, setPrereqInclude } from "../redux/cart";
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';


const Filter = () => {

    const {filter, prereq, prereqInclude} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const courseFilts = [[100, 0], [200, 1], [300, 2], [400, 3]]
    const pre:[string, number][] = [["CIS 120",0], ["CIS 121",1], ["CIS 160",2], ["CIS 240",3],[ "CIS 262",4]]




    return ( 
    <div className = "  border-black border-opacity-10">
        <div className=' p-2 font-bold '>
                 Filters: 
        </div>
        <div className = 'px-4'>
            Levels:
        </div>
        <div className = {`flex justify-center flex-col ml-[30px] `}>
           
                {courseFilts.map((item) => (
                    <div key = {item[0]} className = "flex flex-row m-[4px] ">
                        <div className = "h-[16px] w-[16px] bg-white  border-black border-[1px] rounded-sm mx-2 my-[2px] cursor-pointer" onClick={() => dispatch(setFilter(item[1]))}>
                            {filter[item[1]] && <div className = "top-[-7px]  relative text-red-800"> <CheckIcon style= {{fontSize: "14px", fontWeight: "800"}} /> </div>}
                        </div>
                        <div className = 'relative top-0 cursor-pointer text-[13px]' onClick={() => dispatch(setFilter(item[1]))}>
                            {item[0]}
                        </div>
                    </div>

                ))}
                 

        </div>
        <div className = 'px-4'>
            Prerequisites:
        </div>

        <div className = "ml-[10px]">
        {
            ["Include", "Exclude"].map((item) => (
                <div key = {item} className = "flex flex-row m-[4px] ">
                <div className = {`h-[16px] w-[16px]  border-black border-[1px] rounded-full mx-2 my-[2px] cursor-pointer ${(item === "Include" && prereqInclude) || (item === "Exclude" && !prereqInclude)  ? "bg-red-700" : "bg-white"}`} onClick={() => dispatch(setPrereqInclude(item === "Include"))}>
                </div>
                <div className = 'relative top-0 cursor-pointer text-[13px]' onClick={() => dispatch(setPrereqInclude(item === "Include"))}>
                    {item}
                </div>
            </div>
            ))
        }


        </div>
       

        <div className = {`flex justify-center flex-col ml-[30px] `}>
           
                {pre.map((item) => (
                    <div key = {item[0]}className = "flex flex-row m-[4px] ">
                        <div className = "h-[16px] w-[16px] bg-white  border-black border-[1px] rounded-sm mx-2 my-[2px] cursor-pointer" onClick={() => dispatch(setPrereq(item[1]))}>
                          {prereq[item[1]] && <div className = "top-[-7px]  relative text-red-800"> <CheckIcon style= {{fontSize: "14px", fontWeight: "800"}} /> </div>}
                        </div>
                        <div className = 'relative top-0 cursor-pointer text-[13px]' onClick={() => dispatch(setPrereq(item[1]))}>
                            {item[0]}
                        </div>
                    </div>

                ))}
                 

        </div>
    </div>

);

}
export default Filter;