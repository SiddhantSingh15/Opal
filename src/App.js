import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as HashRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Search from "./pages/Search";
import Results from "./pages/Results";

function App() {


  const [bodyState, setBodyState] = useState(0); 
  const renderBody = (state) => {
    switch (state) {
      case (0):
        return <Search/>
  
      case (1):
        return <Results/>
  
      default:
        return (<div><p>ERROR</p></div>);
    }
  }
  const body = <div></div>;

  return (
    
    <div className='app'>
      <HashRouter>
        <Routes> 
          <Route index path="/" element={
            <div>
              <NavBar searchEnabled={false}/>
              <Search/>
              <p>{bodyState}</p>
            </div>
          }/>
        </Routes>
      </HashRouter>
    </div>
  );
}



// class State {
//   constructor () {
//     this.state = {
//       body: 1,
//       navBar: false,
//       query: null
//     }
//   }
// }

export default App;
