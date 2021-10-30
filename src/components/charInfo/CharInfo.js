import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = props => {
    const [char, setChar] = useState(null);

    const { loading, error, clearError, getCharacter } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) return;

        clearError();
        getCharacter(charId).then(onCharLoaded);
    };

    const onCharLoaded = char => {
        setChar(char);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { description, homepage, name, thumbnail, wiki, comics } = char;

    const thumbnailStyle = thumbnail.includes('image_not_available')
        ? { objectFit: 'contain' }
        : null;

    const renderComics = comics.length
        ? comics.slice(0, 10).map((item, i) => {
              return (
                  <li key={i} className="char__comics-item">
                      {item.name}
                  </li>
              );
          })
        : 'Sorry, there are no comics about this character in the database.';

    return (
        <>
            <div className="char__basics">
                <img style={thumbnailStyle} src={thumbnail} alt="name" />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">{renderComics}</ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import MarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Skeleton from '../skeleton/Skeleton';

// import './charInfo.scss';

// class CharInfo extends Component {
//     state = {
//         char: null,
//         loading: false,
//         error: false,
//     };

//     marvelService = new MarvelService();

//     componentDidMount() {
//         this.updateChar();
//     }

//     componentDidUpdate(prevProps) {
//         if (this.props.charId === prevProps.charId) return;
//         this.updateChar();
//     }

//     updateChar = () => {
//         const { charId } = this.props;
//         if (!charId) return;

//         this.onCharLoading();

//         this.marvelService
//             .getCharacter(charId)
//             .then(this.onCharLoaded)
//             .catch(this.onError);
//     };

//     onCharLoading = () => {
//         this.setState({ loading: true });
//     };

//     onCharLoaded = char => {
//         this.setState({ char, loading: false });
//     };

//     onError = () => {
//         this.setState({ loading: false, error: true });
//     };

//     render() {
//         const { char, loading, error } = this.state;

//         const skeleton = char || loading || error ? null : <Skeleton />;
//         const errorMessage = error ? <ErrorMessage /> : null;
//         const spinner = loading ? <Spinner /> : null;
//         const content = !(loading || error || !char) ? (
//             <View char={char} />
//         ) : null;

//         return (
//             <div className="char__info">
//                 {skeleton}
//                 {errorMessage}
//                 {spinner}
//                 {content}
//             </div>
//         );
//     }
// }

// const View = ({ char }) => {
//     const { description, homepage, name, thumbnail, wiki, comics } = char;

//     const thumbnailStyle = thumbnail.includes('image_not_available')
//         ? { objectFit: 'contain' }
//         : null;

//     const renderComics = comics.length
//         ? comics.slice(0, 10).map((item, i) => {
//               return (
//                   <li key={i} className="char__comics-item">
//                       {item.name}
//                   </li>
//               );
//           })
//         : 'Sorry, there are no comics about this character in the database.';

//     return (
//         <>
//             <div className="char__basics">
//                 <img style={thumbnailStyle} src={thumbnail} alt="name" />
//                 <div>
//                     <div className="char__info-name">{name}</div>
//                     <div className="char__btns">
//                         <a href={homepage} className="button button__main">
//                             <div className="inner">homepage</div>
//                         </a>
//                         <a href={wiki} className="button button__secondary">
//                             <div className="inner">Wiki</div>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             <div className="char__descr">{description}</div>
//             <div className="char__comics">Comics:</div>
//             <ul className="char__comics-list">{renderComics}</ul>
//         </>
//     );
// };

// CharInfo.propTypes = {
//     charId: PropTypes.number,
// };

// export default CharInfo;
