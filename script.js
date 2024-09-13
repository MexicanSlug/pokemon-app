document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemon-list');
    const pokemonDetails = document.getElementById('pokemon-details');

    // Fetch the list of Pokémon
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                const pokemonElement = document.createElement('div');
                pokemonElement.textContent = pokemon.name.toUpperCase();
                pokemonElement.classList.add('pokemon-name');
                pokemonElement.addEventListener('click', () => fetchPokemonDetails(pokemon.url));
                pokemonList.appendChild(pokemonElement);
            });
        });

    // Function to fetch and display Pokémon details
    function fetchPokemonDetails(url) {
        fetch(url)
            .then(response => response.json())
            .then(pokemon => {
                pokemonDetails.innerHTML = `
                    <h2>${pokemon.name.toUpperCase()}</h2>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p><strong>ID:</strong> ${pokemon.id}</p>
                    <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name.toUpperCase()).join(', ')}</p>
                `;
            });
    }
});
