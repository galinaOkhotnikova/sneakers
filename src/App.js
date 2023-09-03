import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { Route } from 'react-router-dom';
import Orders from './pages/Orders';


export const AppContext = React.createContext({});

function App() {
    const [items, setItems] = React.useState([]);
    const [busketItems, setBusketItems] = React.useState([]);
    const [favItems, setFavItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [isBusket, setIsBusket] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    // useEffect не работает с асинхронными функциями
    React.useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const busketResponse = await axios.get('https://my-json-server.typicode.com/galinaOkhotnikova/sneakers_database/busket');
            const favResponse = await axios.get('https://my-json-server.typicode.com/galinaOkhotnikova/sneakers_database/favorites');
            const itemsResponse = await axios.get('https://my-json-server.typicode.com/galinaOkhotnikova/sneakers_database/items');

            setIsLoading(false);
            
            setBusketItems(busketResponse.data);
            setFavItems(favResponse.data);
            setItems(itemsResponse.data);
        };
        fetchData();  
    }, []);

    const AddToBusket = (item) => {
        try {
            if (busketItems.find((el) => Number(el.id) === Number(item.id))) {
                axios.delete(`https://my-json-server.typicode.com/galinaOkhotnikova/sneakrs_database/busket/${item.id}`);
                setBusketItems(prev => prev.filter(el => Number(el.id) !== Number(item.id)))
            }
            else {
                axios.post('https://my-json-server.typicode.com/galinaOkhotnikova/sneakrs_database/busket', item);
                setBusketItems((prev) => [...prev, item]);
            }
        }
        catch (error) {
            alert('Не удалось добавить товар в корзину')
        }
    }
    
    const AddToFavorite = async (item) => {
        try {
            if (favItems.find(obj => Number(obj.id) === Number(item.id))) {
                axios.delete(`https://my-json-server.typicode.com/galinaOkhotnikova/sneakrs_database/favorites/${item.id}`);
                setFavItems((prev) => prev.filter((obj) => Number(obj.id) !== Number(item.id)));
            }
            else {
                //"Дождись" ответа от бэкенда
                const { data } = await axios.post('https://my-json-server.typicode.com/galinaOkhotnikova/sneakrs_database/favorites', item);
                setFavItems((prev) => [...prev, data]);
            }
        }
        catch (error) {
            alert('Не удалось добавить в избранное');
        }
    }

    const removeItem = (id) => {
        axios.delete(`https://my-json-server.typicode.com/galinaOkhotnikova/sneakrs_database/busket/${id}`);
        setBusketItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    }

    const onChangeSeachInput = (event) => {
        setSearchValue(event.target.value);
    }

    const isAdded = (id) => {
        return busketItems.some(obj => Number(obj.id) === Number(id));
    }

    console.log(JSON.stringify(items));

return (
    <AppContext.Provider value={{ items, busketItems, favItems, isAdded, AddToFavorite, setIsBusket, setBusketItems, AddToBusket }}>
        <div className="wrapper clear">
            {/*clear убирает лишние стили*/}
            <Drawer 
                items = {busketItems} 
                onClose = {() => setIsBusket(false)} 
                onRemove = {removeItem} 
                opened={isBusket}
            />
            {/* { isBusket && (<Drawer items = {busketItems} onClose = {() => setIsBusket(false)} onRemove = {removeItem}/>)} */}
            <Header onBusket = {() => setIsBusket(true)}/>
            <Route path="/favorites">
                <Favorites/>
            </Route>
            <Route path="/orders">
                <Orders/>
            </Route>
            <Route path="/" exact>
                <Home
                    items = {items}
                    busketItems = {busketItems}
                    searchValue = {searchValue}
                    setSearchValue = {setSearchValue}
                    onChangeSeachInput = {onChangeSeachInput}
                    AddToFavorite = {AddToFavorite}
                    AddToBusket = {AddToBusket}
                    isLoading = {isLoading}
                />
            </Route>
        </div>
    </AppContext.Provider>            
    );
}

export default App;
