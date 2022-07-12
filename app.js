const search = document.querySelector('.search');
const searchInput = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');
const pokeContainer = document.querySelector('.pokeContainer');

const pokemonCount = 131;

const bg_color = {
    grass: '#8BD369',
    fire: '#FF603F',
    water: '#3399FF',
    bug: '#AABB22',
    normal: '#AAAA99',
    flying: '#9AA8FA',
    poison: '#B76EA4',
    electric: '#FFD34E',
    ground: '#E2C56A',
    fairy: '#F1A8EC',
    psychic: '#FF6EA4',
    fighting: '#C56E5C',
    rock: '#C5B679',
    dragon: '#7766EE',
    ice: '#66CCFF',
}

searchBtn.addEventListener('click', () => {
    search.classList.toggle('active');
})

searchInput.addEventListener('input', (e) => {
    const searchValue = searchInput.value.toLowerCase();
    const pokemonNames = document.querySelectorAll('.pokeName');

    pokemonNames.forEach((pokemonName) => {
        const pokeDiv = pokemonName.parentElement.parentElement;
        if (pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
            pokeDiv.style.display = 'block';
        } else {
            pokeDiv.style.display = 'none';
        }
    })
})

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }
}
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    createPokemonCard(data);
}
const createPokemonCard = (pokemon) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');

    const pokemonId = pokemon.id.toString().padStart(3, '0');
    const pokemonTypes = pokemon.types[0].type.name;
    const pokemonBg = bg_color[pokemonTypes];
    pokemonDiv.style.backgroundColor = `${pokemonBg}`;
    const pokemonInnetHTML = `
            <div class="imgContainer">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
                    alt="PokemonImg">
            </div>
            <div class="pokeInfo">
                <span class="pokeId">#${pokemonId}</span>
                <h3 class="pokeName">${pokemon.name}</h3>
                <div class="small">
                    <small class="pokeExp"><i class="fa-solid fa-flask"></i> <span> ${pokemon.base_experience} Exp</small>
                    <small class="pokeWeight"><i class="fa-solid fa-weight-scale"></i> <span> ${pokemon.weight} kg</small>
                </div>
                <div class="pokeType">
                    <i class="fa-brands fa-uncharted"></i> <span>${pokemonTypes}</span>
                </div>
            </div>
    `;

    pokemonDiv.innerHTML = pokemonInnetHTML;
    pokeContainer.appendChild(pokemonDiv);

}
fetchPokemons()