import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

function Header(props) {

    const { busketItems } = React.useContext(AppContext);
    return (
        <header className="d-flex justify-between align-center">
        {/*Задаем макро-классы из импортированного npm пакета для того, чтобы задать flex и space-between*/}
            <div className="d-flex align-center">
                <Link to="/">
                    <img width = {40} height = {40} src="/img/icon_header.png" alt="Header"/>
                </Link>
                <div>
                    <h3 className="text-uppercase">Sneakers</h3>
                    <p className="opacity-5">Интернет-магазин кроссовок</p>
                </div>
            </div>
            <ul className="d-flex">
                <li className="mr-30 cu-p" onClick = {props.onBusket}>
                    <img width = {18} height = {18} src="/img/basket.svg" alt="Basket"/>
                    <span>{busketItems.reduce((sum, obj) => sum + obj.price, 0)} руб.</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="/favorites">
                        <img width = {18} height = {18} src="/img/selected.svg" alt="Selected"/>
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width = {18} height = {18} src="/img/user.svg" alt="User"/>
                    </Link>
                </li>
            </ul>
        </header> 
    );
}

export default Header;