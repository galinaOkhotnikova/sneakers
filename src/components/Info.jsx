import React from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const Info = ({ title, description, image }) => {

    const {setIsBusket} = React.useContext(AppContext);

    return (
        <div className="BusketEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={image} alt="Empty" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <Link to="/">
                <button onClick={() => setIsBusket(false)} className="GreenButton">
                    <img className="mr-10" src="img/arrow.svg" alt="Arrow" />
                    Вернуться назад
                </button>
            </Link>
        </div>
    );
};

export default Info;