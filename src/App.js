import React from 'react'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
// import Askregistration from './Components/Askregistration'
// import { useNavigate } from 'react-router-dom';
// import {Routes, Route} from 'react-router-dom';

function App() {
  // const navigateToRegistration = () => {
  //   // 👇️ navigate to /contacts
  //   navigate('/Askregistration');
  // };
  // const navigate = useNavigate();
  return (
    <>
     <div>
       <Header/>
      {/* <button onClick={navigateToRegistration}>AskRegistration</button> */}
      <Home/>
     </div>
    </>
  )
}

export default App
