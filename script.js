const errorContainer = document.getElementById('error')
const characterContainer = document.getElementById('character');
const filmsContainer = document.getElementById('films')
const logo = document.getElementById('logo')

const errorMessage = `<p>Didn't find any results with that name :(</p>`

async function getCharacter(search) {
    const url = `https://swapi.dev/api/people/?search=${search.value}`
    try {
        logo.classList.add('animation')
        const res = await fetch(url, {
            method: 'GET',
        });
        const character = await res.json();
        getFilms(character.results[0].films)
        displayCharacter(character.results[0])
    } catch (e) {
        console.log(e)
        errorContainer.innerHTML = errorMessage;
    }
}

async function getFilms(films) {
    films.map(async (film) => {
        try {
            const res = await fetch(film, {
                method: 'GET',
                mode: 'cors'
            })
            const characterFilm = await res.json()
            displayFilm(characterFilm)
        } catch (e) {
            console.log(e)
            errorContainer.innerHTML = errorMessage;
        }
    })
    setTimeout(() => { logo.classList.remove('animation'); }, 10000)
}

document.getElementById('search-button').addEventListener('click', function (e) {
    e.preventDefault();
    var search = document.getElementById('search');
    getCharacter(search)
    characterContainer.innerHTML = "";
    filmsContainer.innerHTML = "";
    errorContainer.innerHTML = "";
})

const displayCharacter = (character) => {
    const characterHtml = `
    <div class="characters">
        <h1>NAME: ${character.name}</h1>
        <h2>BIRTH YEAR: ${character.birth_year}</h2>
        <h2>GENDER: ${character.gender}</h2>
        <h2>EYE COLOR: ${character.eye_color}</h2>
        <h2>SKIN COLOR: ${character.skin_color}</h2>
        <h2>HEIGHT: ${character.height}</h2>
    </div>`
    characterContainer.innerHTML = characterHtml;
}

const displayFilm = (film) => {
    const filmContainer = document.createElement('span');
    const filmHtml = `
        <h1>TITLE: ${film.title}</h1>
        <h2>RELEASE DATE: ${film.release_date}</h2>
        <h2>EPISODE: ${film.episode_id}</h2>`
    filmContainer.innerHTML = filmHtml;
    filmsContainer.appendChild(filmContainer)
};