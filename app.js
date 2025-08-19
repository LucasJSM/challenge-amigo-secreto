const listaAmigos = [];

function adicionarAmigo() {
  const campoNome = document.querySelector("#amigo");
  const nome = campoNome.value;

  if (nome === "") {
    return alert("Digite um nome válido");
  }

  listaAmigos.push(nome);

  atualizarListaAmigos(nome);

  campoNome.value = "";
  campoNome.focus();

  return;
}

function atualizarListaAmigos(nome) {
  const lista = document.querySelector("#listaAmigos");

  if (nome) {
    const item = document.createElement("li");

    item.textContent = nome;
    lista.appendChild(item);
  } else {
    for(let i = 0; i < listaAmigos.length; i++) {
      const item = document.createElement('li');
      item.textContent = listaAmigos[i];
      lista.appendChild(item);
    }
  }

  return;
}

function sortearAmigo() {
  if(listaAmigos.length > 0) {
    const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];

    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = ''; // limpa o resultado anterior
    
    const item = document.createElement('li');
    item.textContent = amigoSorteado;
    resultado.appendChild(item);
  }

  return;
}
