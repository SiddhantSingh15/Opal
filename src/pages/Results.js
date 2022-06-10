import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./Results.css";
import NavSearchBar  from "../components/NavSearchBar";
import {Link} from 'react-router-dom';

function Results() {
  return (
    <div className='results'>
        <div className='results__header'>
					<OpalLogo className = "results__nav_logo"/>
					<div className='results__nav_search'>
							<NavSearchBar />
					</div>
        </div>
        
        <div className='results__body'>
            <p>Hello</p>
        </div>
    </div>
  )
}

export default Results