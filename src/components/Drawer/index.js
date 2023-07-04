import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { AppContext } from '../../App';

import styles from './Drawer.module.scss';

function Drawer({onClose, onRemove, items = [], opened}) {

    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const {busketItems, setBusketItems} = React.useContext(AppContext);

    const onClickOrder = async () => {
        try {
            const {data} = await axios.post('http://localhost:3000/orders', {items: busketItems});
            await axios.put('http://localhost:3000/busket', []);
            setOrderId(data.id);
            setIsOrderComplete(true);
            setBusketItems([]);
        } catch {
            alert("Не удалось создать заказ");
        }
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className=" d-flex justify-between mb-30">
                    Корзина
                    <img onClick = {onClose} className="cu-p" src="/img/remove.svg" alt="Close"></img>
                </h2>
                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                    <div className="items">
                        {items.map((obj) => (
                            <div key={obj.id} className="basketItem d-flex align-center mb-20">
                                <div style={{backgroundImage: `url(${obj.image})`}} className = "basketItemImg"></div>
                                <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price}</b>
                                </div>
                                <img onClick = {() => onRemove(obj.id)} className="removeBtn" src="/img/remove.svg" alt="Remove"/>
                            </div>
                        ))}
                    </div>
                    <div className="busketTotalBlock">
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{busketItems.reduce((sum, obj) => sum + obj.price, 0)} руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{Math.round(busketItems.reduce((sum, obj) => sum + obj.price, 0) * 0.05)} руб.</b>
                            </li>
                        </ul>
                        <button onClick={onClickOrder} className="GreenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"></img></button>
                    </div>
                </div>
                ) : (
                <Info
                    title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан службе доставки` : "Добавьте хотя бы один товар для оформления заказа"}
                    image={isOrderComplete ? "/img/confirm.svg" : "/img/empty.svg"}
                >
                </Info>
                )}
            </div>
        </div>
    );
}

export default Drawer;