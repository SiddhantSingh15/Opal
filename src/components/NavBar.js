import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./NavBar.css";

const NavBar = ({app}) => {
  return (
		<div className='navbar'>
			{app.state.page !== "home" && 
			<OpalLogo className = 'logo' onClick={() => app.handleGoToPage("home")}/>
			}
		</div>
  )
}

export default NavBar