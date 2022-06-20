import React from 'react';
import "./Home.css"
import { ReactComponent as OpalLogo } from "../assets/opal.svg"
import SearchBox from '../components/SearchBox.js';


  class Home extends React.Component {

  render() {
    return (
      <div className='home'>
        {/* The Logo*/}
        <OpalLogo className="searchLogo" />
        <div className="search-box">
          <SearchBox app={this.props.app}/>
        </div>
      </div>

    );
  }
}

export default Home;