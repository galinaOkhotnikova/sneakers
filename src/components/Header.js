import React from 'react';

function Header(props) {
    return (
        <header className="d-flex justify-between align-center">
        {/*Задаем макро-классы из импортированного npm пакета для того, чтобы задать flex и space-between*/}
            <div className="d-flex align-center">
                <img width = {40} height = {40} src="/img/icon_header.png" alt="Header"/>
                <div>
                    <h3 className="text-uppercase">Sneakers</h3>
                    <p className="opacity-5">Интернет-магазин кроссовок</p>
                </div>
            </div>
            <ul className="d-flex">
                <li className="mr-30 cu-p" onClick = {props.onBusket}>
                    <img width = {18} height = {18} src="/img/basket.svg" alt="Basket"/>
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img width = {18} height = {18} src="/img/user.svg" alt="User"/>
                </li>
            </ul>
        </header> 
    );
}

export default Header;