import Card from '../components/Card';
import React from 'react';

function Home({
    items,
    busketItems,
    searchValue,
    setSearchValue,
    onChangeSeachInput,
    AddToFavorite,
    AddToBusket,
    isLoading,
})  

{
    const renderItems = () => {
        const filtredItems = items.filter((obj) => 
            obj.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading 
            ? [...Array(8)]
            : filtredItems).
            map((obj, index) => (
                <Card 
                    /*В качестве ключа лучше не использовать индекс, потом исправить */
                    key = {index}
                    {...obj}
                    onClickFav = {(item) => AddToFavorite(item)}
                    onClickAdd = {(item) => AddToBusket(item)}
                    // Если хотя бы одно true, то вернет true, если ничего не совпало - false
                    isLoading = {isLoading}
                />
            ));
        };

    return (
        <div className="content">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    <input onChange={onChangeSeachInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home