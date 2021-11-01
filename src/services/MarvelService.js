import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=6bd3bebd9d2a8557bc712adf1db8c28d';

    const getAllCharacters = async offset => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );
        // return res.data.results.map(char => _transformCharacter(char)); - ниже более короткая запись
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async id => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getComics = async (offset, limit = '8') => {
        const res = await request(
            `${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(comic => _transformComic(comic));
    };

    const getComic = async id => {
        const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
        return _transformComic(res.data.results[0]);
    };

    const _transformCharacter = char => {
        return {
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : 'Sorry, this character has no description.',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        };
    };

    const _transformComic = comic => {
        return {
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            title: comic.title,
            price: comic.prices[0].price,
            id: comic.id,
            description: comic.description || 'There is no description',
            pageCount: comic.pageCount
                ? `${comic.pageCount} pages.`
                : 'No information about the number of pages',
            language: comic.textObjects.language || 'en-us',
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getComics,
        getComic,
    };
};

export default useMarvelService;
