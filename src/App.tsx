import Nav from './components/Nav';
import Filter from './components/Filter';
import Cart from './components/Cart';
import Courses from './components/Courses';
import Description from './components/Description';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import React from 'react';

const App= () => {

  const {tab} = useSelector((state: RootState) => state.cart);



  return (
    <div className = "app">
    <div className = "nav sm:h-[8vh] h-[11vh]">
    <Nav  />
    </div>
    <div className = "flex h-[90vh] sm:flex-row flex-col bg-gray-200  ">
        <div className = {`sm:flex-[0.15] h-full sticky overflow-y-scroll sm:border-opacity-10 min-w-[100px] overflow-hidden ${tab === "filter" ? "visible" : "hidden sm:block"}`}>
        <Filter   />
        <Description />

        </div>

        <div className = {`flex sm:flex-[0.85] flex-col overflow-y-scroll  ${tab === "course" ? "visible" : "hidden sm:block "}`}>
        <Courses  />

        </div>
        <div className = {`sm:flex-[0.3] border-l-[1px] overflow-y-scroll border-[#041d5b] border-opacity-10 ${tab === "cart" ? "visible" : "hidden sm:block"}`}>
          <Cart  />


        </div>
        </div>
    </div>
  )
}
export default App;
