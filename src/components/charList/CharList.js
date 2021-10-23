import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = offset => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({ newItemLoading: true });
    };

    onCharListLoaded = newCharList => {
        let ended = false;

        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ offset, charList }) => ({
            // предыдущее состояние
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    renderCharListItem(char) {
        let thumbnailStyle = null;

        if (char.thumbnail.includes('image_not_available')) {
            thumbnailStyle = { objectFit: 'unset' };
        }

        if (char.thumbnail.includes('4c002e0305708')) {
            thumbnailStyle = { objectPosition: 'right' };
        }

        return (
            <li
                key={char.id}
                className="char__item"
                onClick={() => this.props.onCharSelected(char.id)}
            >
                <img
                    style={thumbnailStyle}
                    src={char.thumbnail}
                    alt={char.name}
                />
                <div className="char__name">{char.name}</div>
            </li>
        );
    }

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded } =
            this.state;

        const elements = charList.map(char => {
            return this.renderCharListItem(char);
        });

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? elements : null;
        const charListStyle = loading
            ? {
                  display: 'flex',
                  justifyContent: 'center',
                  //   alignItems: 'center',
                  //   minHeight: 1014,
              }
            : null;

        return (
            <div className="char__list">
                <ul className="char__grid" style={charListStyle}>
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ display: charEnded ? 'none' : 'block' }}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
