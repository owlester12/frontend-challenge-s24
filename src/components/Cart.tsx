import InCourse from "./InCourse";
import {DragDropContext, DropResult, Droppable} from '@hello-pangea/dnd'
import {useSelector} from 'react-redux'
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { reOrderPrimCart, setIsPrimCart, reOrderAltCart } from "../redux/cart";
import React from 'react';



const Cart = () =>{

  const {primCart, altCart, isPrimCart} = useSelector((state: RootState) => state.cart);


  const dispatch = useDispatch();
  const theCart = isPrimCart ? primCart : altCart 

  //Used when changing course carts onClcik
  const setOther = () => {
    dispatch(setIsPrimCart())
  }

  //Handles drag and drop 
  const handleOnDragEnd = (result:DropResult) => {
    if(!result.destination) return;
    const cartCopy = theCart.map((x) => x);
    const [reorderItem] = cartCopy.splice(result.source.index, 1);
    cartCopy.splice(result.destination.index, 0,  reorderItem);

    if(isPrimCart){
      dispatch(reOrderPrimCart(cartCopy));
    } else {
      dispatch(reOrderAltCart(cartCopy));
    }
    
  }

 


    return( 
    <div className = ' border-black border-opacity-10 ' >
       <div className = "  p-2 cursor-pointer" >
        <div className = "font-bold">Cart:</div>
        <div className = "flex justify-around pt-2">
          <div className = {`${isPrimCart ? "text-red-700 underline hover:border-gray-600" : "hover:border-red-700"} rounded-md  border-[1px] border-transparent py-1 px-2 `} onClick = {() => setOther()}>
            Primary
          </div>
          <div className = {`${isPrimCart ? "hover:border-red-700" : "text-red-700 underline  hover:border-gray-600" }  rounded-md  border-[1px] border-transparent py-1 px-2`} onClick = {() => setOther()}>
            Alternative
          </div>
        </div>

        </div>
 


        
        {theCart.length === 0 && <div className = "empty text-sm p-2"> Your cart is empty </div> }
     
        <DragDropContext onDragEnd = {handleOnDragEnd}>
          <Droppable droppableId="cart">
            {(provided) => (
              <div {...provided.droppableProps} ref = {provided.innerRef}>
   
                  {theCart?.map((value, index) => (
   
   
                    <InCourse  key = {value.number} course = {value}  index = {index} />
   
                  ))}
                {provided.placeholder}
              </div> )}
      
          </Droppable>
        </DragDropContext>
     </div>
     );
   }
   
   export default Cart;
   