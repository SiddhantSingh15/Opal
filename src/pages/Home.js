import React from 'react';
import "./Home.css";
import Search  from "../components/Search";
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className='home'>
        <div className='home__header'>
            {/* <div className='home__headerLeft'>
                <Link to='/about'>About</Link>
                <Link to='/collab'>Collab</Link>
            </div> */}
        </div>

        <div className='home__body'>
            <img 
            src={require("../assets/logo.svg")}
            alt='logo'
            />
            <div className='home__inputContainer'>
                <Search />
            </div>
        </div>
    </div>
  )
}

export default Home