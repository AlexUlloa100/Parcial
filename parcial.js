const valorinput = () => {
    let inputtexto = document.getElementById("input_pokemon");
    let valor = inputtexto.value.trim().toLowerCase(); // por si escriben con mayúsculas
    if (valor) {
        peticion(valor);
    }
}

const peticion = (poke) => {
    const urlbase = "https://pokeapi.co/api/v2/";
    const endpoint = `pokemon/${poke}`;
    const url = `${urlbase}${endpoint}`;
    axios.get(url)
        .then(res => datos(res.data))
        .catch(err => {
            document.getElementById("informacion").innerHTML = `<p style="color:red;">Pokémon no encontrado</p>`;
            console.error(err);
        });
}

const datos = (data) => {
    let respuesta = document.getElementById("informacion");
    let habilidades = data.abilities.map(a => a.ability.name).join(", ");
    let tipos = data.types.map(t => t.type.name).join(", ");
    let altura = data.height / 10;
    let peso = data.weight / 10;

    respuesta.innerHTML = `
        <h1>${data.name.toUpperCase()}</h1>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><b>Habilidades:</b> ${habilidades}</p>
        <p><b>Tipos:</b> ${tipos}</p>
        <p><b>Altura:</b> ${altura} m</p>
        <p><b>Peso:</b> ${peso} kg</p>
    `;
}
