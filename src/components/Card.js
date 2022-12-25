import React from 'react';

function Card({onClickFav, image, title, price, onClickAdd}) {
    //Используем хук useState
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleAdd = () => {
        onClickAdd({title, image, price});
        setIsAdded(!isAdded);
    };

    const handleFavorite = () => {
        onClickFav({title, image, price});
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="card ml-30">
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
                <img className="add" onClick = {handleAdd} src= { isAdded ?  "/img/btn2.svg":"/img/btn1.svg"} alt="Plus"></img>
            </div>
        </div>
    );
}

export default Card;