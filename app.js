let listaAmigos = [];

document.querySelector(".button-add").addEventListener("click", adicionarAmigo);

document.querySelector("#amigo").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    adicionarAmigo();
  }
});

function adicionarAmigo() {
  const campoNome = document.querySelector("#amigo");
  const nome = campoNome.value.trim();

  if (nome === "") {
    return alert("Digite um nome válido");
  }

  const amigo = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    nome: nome,
  };

  listaAmigos.push(amigo);
  atualizarListaAmigos(amigo);

  campoNome.value = "";
  campoNome.focus();

  return;
}

function atualizarListaAmigos(amigo) {
  const lista = document.querySelector("#listaAmigos");
  const item = document.createElement("li");
  item.id = amigo.id;

  const nomeSpan = document.createElement("span");
  nomeSpan.textContent = amigo.nome;
  nomeSpan.className = "nome-amigo";

  // container para os botões
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";
  buttonGroup.appendChild(criarBotaoAlterar(amigo));
  buttonGroup.appendChild(criarBotaoRemover(amigo.id));

  item.appendChild(nomeSpan);
  item.appendChild(buttonGroup);
  lista.appendChild(item);

  document.querySelector("#resultado").innerHTML = "";

  return;
}

function removerAmigo(id) {
  listaAmigos = listaAmigos.filter((amigo) => amigo.id !== id);
  document.getElementById(id)?.remove();
  document.querySelector("#resultado").innerHTML = "";

  return;
}

function criarBotaoRemover(id) {
  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "X";
  botaoRemover.className = "button-remove";
  botaoRemover.addEventListener("click", function () {
    removerAmigo(id);
  });

  return botaoRemover;
}

function alterarNome(amigo) {
  const novoNome = prompt("Digite o novo nome:", amigo.nome);

  if (novoNome && novoNome.trim() !== "") {
    amigo.nome = novoNome.trim();
    const item = document.getElementById(amigo.id);
    item.querySelector(".nome-amigo").textContent = amigo.nome;
  } else {
    alert("Nome inválido!");
  }

  document.querySelector("#resultado").innerHTML = "";

  return;
}

function criarBotaoAlterar(amigo) {
  const botaoAlterar = document.createElement("button");
  botaoAlterar.className = "button-edit";

  const icon = document.createElement("img");
  icon.src = "./assets/pencil.svg";
  icon.className = "icon-edit";

  botaoAlterar.appendChild(icon);

  botaoAlterar.addEventListener("click", function () {
    alterarNome(amigo);
  });

  return botaoAlterar;
}

function sortearAmigo() {
  if (listaAmigos.length > 1) {
    const amigoSorteado =
      listaAmigos[Math.floor(Math.random() * listaAmigos.length)];

    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = "";

    const item = document.createElement("li");
    item.textContent = amigoSorteado.nome;
    resultado.appendChild(item);
  } else {
    alert("Adicione mais amigos para sortear!");
  }

  return;
}
