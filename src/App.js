import React from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
    const [items, setItems] = React.useState([]);
    const [basketItems, setBusketItems] = React.useState([]);
    const [favItems, setFavItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [isBusket, setIsBusket] = React.useState(false);

    React.useEffect(() => {
        axios.get('https://634c64fbacb391d34a8504e3.mockapi.io/items').then((res) => {
        setItems(res.data);
        });
        axios.get('https://634c64fbacb391d34a8504e3.mockapi.io/busket').then((res) => {
        setBusketItems(res.data);
        });
    }, []);

    const AddToBusket = (item) => {
        axios.post('https://634c64fbacb391d34a8504e3.mockapi.io/busket', item);
        setBusketItems((prev) => [...prev, item]);
    }
    
    const AddToFavorite = (item) => {
        axios.post('https://634c64fbacb391d34a8504e3.mockapi.io/favorites', item);
        setFavItems((prev) => [...prev, item]);
    }

    const removeItem = (id) => {
        axios.delete(`https://634c64fbacb391d34a8504e3.mockapi.io/busket/${id}`);
        setBusketItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    }

    const onChangeSeachInput = (event) => {
        setSearchValue(event.target.value);
    }

return (            
        <div className="wrapper clear">
            {/*clear убирает лишние стили*/}
            { isBusket && (<Drawer items = {basketItems} onClose = {() => setIsBusket(false)} onRemove = {removeItem}/>)}
            <Header onBusket = {() => setIsBusket(true)}/>
            <div className="content">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input onChange={onChangeSeachInput} value={searchValue} placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase())).map((obj, index) => (
                    <Card 
                        /*В качестве ключа лучше не использовать индекс, потом исправить */
                        key = {index}
                        title = {obj.title}
                        price = {obj.price}
                        image = {obj.image}
                        onClickFav = {(item) => AddToFavorite(item)}
                        onClickAdd = {(item) => AddToBusket(item)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
