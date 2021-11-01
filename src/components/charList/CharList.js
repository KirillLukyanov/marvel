import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = props => {
    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then(onCharListLoaded);
    };

    const onCharListLoaded = newCharList => {
        let ended = false;

        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList([...charList, ...newCharList]);
        // setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    };

    const charRefsArr = useRef([]);

    // const setCharRef = elem => {
    //     charRefsArr.current.push(elem);
    // };

    const setFocusOnChar = id => {
        charRefsArr.current.forEach(char => {
            char.classList.remove('char__item_selected');
        });
        charRefsArr.current[id].classList.add('char__item_selected');
        charRefsArr.current[id].focus();
    };

    const renderCharListItem = charArr => {
        return charArr.map((char, id) => {
            let thumbnailStyle = null;

            if (char.thumbnail.includes('image_not_available')) {
                thumbnailStyle = { objectPosition: 'left' };
            }

            if (char.thumbnail.includes('4c002e0305708')) {
                thumbnailStyle = { objectPosition: 'right' };
            }

            return (
                <li
                    tabIndex={0}
                    ref={el => (charRefsArr.current[id] = el)}
                    key={char.id}
                    className="char__item"
                    onClick={() => {
                        props.onCharSelected(char.id);
                        setFocusOnChar(id);
                    }}
                    onKeyPress={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(char.id);
                            setFocusOnChar(id);
                        }
                    }}
                >
                    <img
                        style={thumbnailStyle}
                        src={char.thumbnail}
                        alt={char.name}
                    />
                    <div className="char__name">{char.name}</div>
                </li>
            );
        });
    };

    const elements = renderCharListItem(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    const charListStyle =
        (loading && !newItemLoading) || error
            ? {
                  display: 'flex',
                  justifyContent: 'center',
                  //   alignItems: 'center',
                  minHeight: 1014,
              }
            : null;

    return (
        <div className="char__list">
            <ul className="char__grid" style={charListStyle}>
                {errorMessage}
                {spinner}
                {elements}
            </ul>
            <button
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charEnded ? 'none' : 'block' }}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
