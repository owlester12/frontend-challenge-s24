import {ChangeEvent, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/cart";
import { setTab } from '../redux/cart';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import React from 'react';


const Nav = () =>{

  const dispatch = useDispatch();

 
  const [theInput, setTheInput] = useState<string>('');
  const {tab} = useSelector((state: RootState) => state.cart);


  function handleChange(e: ChangeEvent<HTMLInputElement>){
   setTheInput(e.target.value);
  }

  function onSubmitSearch(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    dispatch(setSearch(theInput));

  }

  const navigate = useNavigate(); 
  function routeChange(){ 
    navigate('checkout');
  }

  const sTab = (inp: string) => {
    dispatch(setTab(inp));

  }

  
  
return  (<div className = " h-full  flex-col w-full p-[5px] pl-[50px] py-[10px] border-b-[1px] bg-[#041d5b] border-gray-100 text-white flex items-center justify-around m-0">
   <div className = "flex w-full justify-around ">
   <h2 className = "sm:block hidden font-bold text-lg">Penn Course Cart</h2>

    <form className = "flex items-center" onSubmit={e => onSubmitSearch(e)}>
      <input className = "focus:outline-none min-w-[200px]  py-[3px] px-[16px] rounded-l-[8px] border-[1px] border-white text-black text-[15px] sm:text-[18px]"
      type = "text" id = "navInput" onChange={e => handleChange(e)}  />
      <button type = "submit"
      className = "sm:py-[4.5px] py-[2px] px-[2px] w-[50px] rounded-r-[8px] border-[1px] border-[#9c0404] bg-[#9c0404] text-white text-[12px] "> 
      <SearchIcon /></button>
    </form>

    <button className = " border-[#9c0404] bg-[#9c0404] py-[4px] px-[8px] rounded-[8px] text-white items-center sm:text-[15px] sm:font-bold"
    onClick = {routeChange}> Checkout </button>
    </div>
    <div className = "sm:hidden flex flex-row justify-around w-full">
      <div className = {`text-[14px] uppercase cursor-pointer hover:text-gray-200  ${tab === "cart"? "underline" :""}`} onClick = {() => sTab("cart")}>
        Cart
      </div>
      <div className = {`text-[14px] uppercase cursor-pointer hover:text-gray-200  ${tab === "course"? "underline" :""}`} onClick = {() => sTab("course")}>
        Courses
      </div>
      <div className = {`text-[14px] uppercase cursor-pointer hover:text-gray-200  ${tab === "filter"? "underline" :""}`} onClick = {() => sTab("filter")}>
        Filters
      </div>

    </div>
    
  </div>
  );
}

export default Nav;