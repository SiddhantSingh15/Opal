import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./Search.css";
import HomeSearchBar  from "../components/HomeSearchBar";
import NavBar from '../components/NavBar';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className='home'>
        <div className='home__header'>
            <NavBar/>
        </div>
        
        <div className='home__body'>
            <OpalLogo className = "logo--title"/>
            <div className='home__inputContainer'>
                <HomeSearchBar />
            </div>
        </div>
    </div>
  )
}

export default Home