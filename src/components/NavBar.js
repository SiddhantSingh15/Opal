import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./NavBar.css";
import NavSearchBar  from "../components/NavSearchBar";

function NavBar() {
  return (
		<div className='navbar'>
			<div className='navbar__search'>
					<OpalLogo className = 'navbar__logo'/>
					<NavSearchBar/>
			</div>
			<div className="navbar__links">
				<ul>
					<li><a href="/">Search</a></li>
					<li><a href="/tags">Tags</a></li>
					<li><a href="/repo">Repository</a></li>
				</ul>
			</div>
		</div>
  )
}

export default NavBar