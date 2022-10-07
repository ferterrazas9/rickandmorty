import React, { useState } from "react";
import locationInfo from './styles/locationInfo.css'

const LocationInfo = ({ location }) => {


    return (
        <article className="location__show">
            <h2 className="center_title">{location?.name}</h2>
            <ul className="row__list">
                <li className="text__center"><span className="color__text">Type: </span>{location?.type}</li>
                <li className="text__center"><span className="color__text">Dimension: </span>{location?.dimension}</li>
                <li className="text__center"><span className="color__text">Population: </span>{location?.residents.length}</li>
            </ul>
        </article>
    )
}

export default LocationInfo