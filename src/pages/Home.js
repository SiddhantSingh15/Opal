import React from 'react';
import "./Home.css";
import Search from "../components/Search";
import {Avatar} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className='home'>
        <div className='home__header'>
            <div className='home__headerLeft'>
                <Link to='/about'>About</Link>
                <Link to='/collab'>Collab</Link>
            </div>
            <div className='home__headerRight'>
                <Link to='/login'>Login</Link>
                <Link to='/upload'>Upload</Link>
                <AppsIcon />
                <Avatar />
            </div>
        </div>

        <div className='home__body'>
            <img 
            src='ttps://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
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