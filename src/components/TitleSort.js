import React from "react"
import {ReactComponent as UpCaret} from "../assets/upcaret.svg"
import {ReactComponent as DownCaret} from "../assets/downcaret.svg"

export default function TitleSort({name,handleSort,sortFocus,sortDirection}) {

	const renderCarat = () => {
		if (sortFocus === name) {
			if (sortDirection === "up") {
				return <UpCaret className="icon"/>
			} else if (sortDirection === "down") {
				return <DownCaret className="icon"/>
			} else {
				return null
			}
		}
	}

	return (
		<div
			onClick={() => handleSort(name)}
			className="title-element">
			{name}
			{renderCarat()}
		</div>
	)
}