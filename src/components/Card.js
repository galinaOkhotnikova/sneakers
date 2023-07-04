import React from 'react';
import ContentLoader from "react-content-loader"
import {AppContext} from '../App';

function Card({ id, onClickFav, image, title, price, onClickAdd, isFav = false, isLoading = false}) {
    //Используем хук useState
    // const [isAdded, setIsAdded] = React.useState(isAdd);
    const [isFavorite, setIsFavorite] = React.useState(isFav);

    const handleAdd = () => {
        onClickAdd({id, title, image, price});
    };

    const handleFavorite = () => {
        onClickFav({id, title, image, price});
        setIsFavorite(!isFavorite);
    }

    const {isAdded} = React.useContext(AppContext);

    return (
        <div className="card ml-30">
            {isLoading ? (
        <ContentLoader
            speed={2}
            width={210}
            height={260}
            viewBox="0 0 165 260"
            backgroundColor="#f3f3f3"
            foregroundColor="#f2f2f2">
            <rect x="0" y="20" rx="10" ry="10" width="133" height="112" />
            <rect x="0" y="143" rx="5" ry="5" width="133" height="15" />
            <rect x="0" y="162" rx="5" ry="5" width="100" height="15" />
            <rect x="1" y="199" rx="5" ry="5" width="80" height="20" />
            <rect x="103" y="188" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
        ) : (
        //! Фрагмент
        <>
            <div className="favorite">
                <img src= { isFavorite ?  "/img/heart2.svg":"/img/heart1.svg"} alt="Unliked"  onClick = {handleFavorite}/>
            </div>
            <img width={133} height={112} src={image} alt="Sneakers" />
            <p>{title}</p>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
                </div>
                <img className="add" onClick = {handleAdd} src= { isAdded(id) ?  "/img/btn2.svg":"/img/btn1.svg"} alt="Plus"></img>
            </div>
        </>
        )}
        </div>
    );
}

export default Card;