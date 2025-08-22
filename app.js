let listaAmigos = [];

const botaoAdicionar = document.querySelector('.button-add');
botaoAdicionar.addEventListener('click', adicionarAmigo);
document.querySelector('#amigo').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    adicionarAmigo();
  }
});

function adicionarAmigo() {
  const campoNome = document.querySelector("#amigo");
  const nome = campoNome.value;

  if (nome === "") {
    return alert("Digite um nome válido");
  }

  const amigo = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    nome: nome
  };

  listaAmigos.push(amigo);
  atualizarListaAmigos(amigo);

  campoNome.value = "";
  campoNome.focus();

  return;
}

function atualizarListaAmigos(amigo) {
  const lista = document.querySelector("#listaAmigos");
  const item = document.createElement('li');

  item.textContent = amigo.nome;
  item.id = amigo.id;

  item.appendChild(criarBotaoRemover(amigo.id));
  lista.appendChild(item);

  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = '';
  
  return;
}

function removerAmigo(id) {
  listaAmigos = listaAmigos.filter(amigo => amigo.id !== id);

  document.querySelector('#listaAmigos').innerHTML = '';
  listaAmigos.forEach(amigo => atualizarListaAmigos(amigo));
}

function criarBotaoRemover(id) {
  const botaoRemover =  document.createElement('button');
  botaoRemover.textContent = 'X';
  botaoRemover.className = 'button-remove';
  botaoRemover.addEventListener('click', function() { 
    removerAmigo(id) 
  });
  
  return botaoRemover;
}

function sortearAmigo() {
  if(listaAmigos.length > 1) {
    const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];

    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
    
    const item = document.createElement('li');
    item.textContent = amigoSorteado.nome;
    resultado.appendChild(item);
  } else {
    alert('Adicione mais amigos para sortear!');
  }

  return;
}
