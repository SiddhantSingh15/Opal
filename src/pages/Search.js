import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./Search.css";
import HomeSearchBar  from "../components/HomeSearchBar";
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className='home'>
        {/* <div className='home__header'>
            { <div className='home__headerLeft'>
                <Link to='/about'>About</Link>
                <Link to='/collab'>Collab</Link>
            </div> }
        </div> */}
        
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