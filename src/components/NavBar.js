import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./NavBar.css";

const NavBar = ({app}) => {
  return (
		<div className='navbar'>
			{app.state.page !== "search" && 
				<div className='navbar__search'>
					<OpalLogo className = 'navbar__logo' onClick={() => app.handleGoToPage("search")}/>
				</div>
			}
			<div className="navbar__links">
				<ul>
					{/* <p onClick={() => app.handleGoToPage("search")} >Search</p> */}
					{/* <p>Tags</p>
					<p>Repository</p> */}
				</ul>
			</div>
		</div>
  )
}

export default NavBar