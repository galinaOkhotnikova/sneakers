import Card from '../components/Card';
import React from 'react';
import {AppContext} from '../App';
import Info from '../components/Info';

function Favorites() {
    const {favItems, AddToFavorite} = React.useContext(AppContext);

    return <div className="content">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>Мои закладки:</h1>
                </div>
                { favItems.length > 0 ? (
                    <div className="d-flex flex-wrap">
                        {favItems.map((obj, index) => (
                            <Card 
                                /*В качестве ключа лучше не использовать индекс, потом исправить */
                                key = {index}
                                {...obj}
                                isFav = {true}
                                onClickFav  = {(item) => AddToFavorite(item)}
                            />
                        ))}
                    </div>
                ) :
                (
                    <Info
                        title={"Нет закладок"}
                        description={"Ни один товар еще не был добавлен в закладки"}
                        image={"/img/noFav.svg"}
                    >

                    </Info>
                )}
            </div>
}

export default Favorites