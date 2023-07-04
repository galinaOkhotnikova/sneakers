import React from 'react'
import axios from 'axios';
import Card from '../components/Card';
import {AppContext} from '../App';
import Info from '../components/Info';

function Orders() {
    const { addToFavorite, addToBusket} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://my-json-server.typicode.com/galinaOkhotnikova/sneakrs_database/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов');
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className="content">
            <div className="d-flex align-center mb-40 justify-between">
                    <h1>Мои заказы:</h1>
            </div>
            { orders.length > 0 ? (
                <div className="d-flex flex-wrap">
                    {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card key={index} loading={isLoading} {...item} />
                    ))}
                </div>
        ) : (
            <Info
                title={"Нет заказов"}
                description={"Вы еще ничего не покупали"}
                image={"/img/noOrders.svg"}
            >
            </Info>
        )}
    </div>
    );
}

export default Orders;