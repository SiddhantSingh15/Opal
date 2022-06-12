import React from 'react';
import {ReactComponent as SearchIcon} from "../assets/magnifier.svg"
import {ReactComponent as TagIcon} from "../assets/tag.svg"
import "./Tag.css"

const Tag = ({tagData,key,handleClick}) => {
	return ( 
		<button className="tag" key={key} onClick={handleClick} >
			{tagData.type === "tag" ? <TagIcon className='tagIcon' fill="white"/> : <SearchIcon  className='tagIcon' fill="white"/>}
			{tagData.include === true ? <p>{tagData.name}</p> : <s>{tagData.name}</s>}
		</button>
	);
}
 
export default Tag;