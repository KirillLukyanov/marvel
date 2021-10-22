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
    };

    componentDidMount() {
        this.updateCharList();
    }

    marvelService = new MarvelService();

    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    onCharListLoaded = charList => {
        this.setState({ charList, loading: false });
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    renderCharListItem(char) {
        const thumbnailStyle = char.thumbnail.includes('image_not_available')
            ? { objectFit: 'unset' }
            : null;
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
        const { loading, error } = this.state;

        const charList = [...this.state.charList];
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
                  alignItems: 'center',
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;

// import { Component } from 'react';
// import MarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import './charList.scss';

// class CharList extends Component {
//     state = {
//         charList: [],
//         loading: true,
//         error: false,
//     };

//     componentDidMount() {
//         this.updateCharList();
//     }

//     marvelService = new MarvelService();

//     updateCharList = () => {
//         this.marvelService
//             .getAllCharacters()
//             .then(this.onCharListLoaded)
//             .catch(this.onError);
//     };

//     onCharListLoaded = charList => {
//         this.setState({ charList, loading: false });
//     };

//     onError = () => {
//         this.setState({ loading: false, error: true });
//     };

//     render() {
//         const { loading, error } = this.state;

//         const charList = [...this.state.charList];
//         const elements = charList.map(char => {
//             return <CharListItem char={char} key={char.id} />;
//         });

//         const errorMessage = error ? <ErrorMessage /> : null;
//         const spinner = loading ? <Spinner /> : null;
//         const content = !(loading || error) ? elements : null;
//         const charListStyle = loading
//             ? {
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   //   minHeight: 1014,
//               }
//             : null;

//         return (
//             <div className="char__list">
//                 <ul className="char__grid" style={charListStyle}>
//                     {errorMessage}
//                     {spinner}
//                     {content}
//                 </ul>
//                 <button className="button button__main button__long">
//                     <div className="inner">load more</div>
//                 </button>
//             </div>
//         );
//     }
// }

// export default CharList;

// const CharListItem = ({ char }) => {
//     const thumbnailStyle = char.thumbnail.includes('image_not_available')
//         ? { objectFit: 'unset' }
//         : null;
//     return (
//         <li key={char.id} className="char__item">
//             <img style={thumbnailStyle} src={char.thumbnail} alt={char.name} />
//             <div className="char__name">{char.name}</div>
//         </li>
//     );
// };
