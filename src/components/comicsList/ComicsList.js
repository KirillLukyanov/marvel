import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const { loading, error, getComics } = useMarvelService();

    const onComicsLoaded = newComicsList => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
        setNewItemLoading(false);
    };

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComics(offset).then(onComicsLoaded);
    };

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const renderComics = comicsArr => {
        return comicsArr.map(comic => {
            let thumbnailStyle = null;

            if (comic.thumbnail.includes('image_not_available')) {
                thumbnailStyle = { objectFit: 'cover', objectPosition: 'left' };
            }

            // if (comic.thumbnail.includes('4c002e0305708')) {
            //     thumbnailStyle = { objectPosition: 'right' };
            // }

            return (
                <li className="comics__item" key={comic.key}>
                    <a href="#">
                        <img
                            style={thumbnailStyle}
                            src={comic.thumbnail}
                            alt={comic.title}
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">
                            {comic.price ? `${comic.price}$` : 'NOT AVAILABLE'}
                        </div>
                    </a>
                </li>
            );
        });
    };

    const elements = renderComics(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    const comicsStyle =
        (loading && !newItemLoading) || error
            ? {
                  display: 'flex',
                  justifyContent: 'center',
                  //   alignItems: 'center',
                  //   minHeight: 1014,
              }
            : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid" style={comicsStyle}>
                {elements}
                {errorMessage}
                {spinner}
            </ul>
            <button
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import './comicsList.scss';
// import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';

// const ComicsList = () => {
//     return (
//         <div className="comics__list">
//             <ul className="comics__grid">
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

// export default ComicsList;
