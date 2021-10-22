class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=6bd3bebd9d2a8557bc712adf1db8c28d';
    getResource = async url => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResource(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
        );
        // return res.data.results.map(char => this._transformCharacter(char)); - ниже более короткая запись
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async id => {
        const res = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = char => {
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
}

export default MarvelService;
