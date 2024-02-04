import CheckCourse from './components/CheckCourse';
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import { RootState } from './redux/store';
import React from 'react';


const Checkout = () => {

  const {primCart, altCart} = useSelector((state: RootState) => state.cart);


  const navigate = useNavigate(); 
  function routeChange(){ 
    navigate('/');
  }

  return( 

    <div className = "mb-[20px]">
     <div className = "w-full p-[0.1rem] pl-[50px] border-b-[1px] bg-[#041d5b] border-gray-100 text-white h-[10vh] flex items-center justify-around m-0">
      <h2 className = "font-bold text-lg">Penn Course Cart</h2>
      <button onClick = {routeChange} className = 'border-[1px] border-[#9c0404] bg-[#9c0404] p-[10px] rounded-[8px] text-white items-center text-[15px] font-bold '> Home </button>
    </div>
    <div className = "flex flex-col">
      <div className = 'mx-auto max-w-[700px] p-[10px]' >
        <h4 className = "mb-[5px] font-bold">Primary Course Cart</h4>
   
        {primCart.length === 0 && <div className = "empty"> Your cart is empty </div> }

        {primCart.map((value, index) => (

          <CheckCourse  key = {value.number} course = {value} index = {index}  />

        ))}
      </div>
      <div className = 'mx-auto max-w-[700px] p-[10px]' >
        <h4 className = "mb-[5px] font-bold">Alternative Course Cart</h4>
   
        {altCart.length === 0 && <div className = "empty"> Your cart is empty </div> }

        {altCart.map((value, index) => (

          <CheckCourse  key = {value.number} course = {value} index = {index}  />

        ))}
      </div>
    </div>
 </div>);
}

export default Checkout;

