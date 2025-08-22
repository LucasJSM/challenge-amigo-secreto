let friendsList = [];
let drawnFriends = [];

document.querySelector(".button-add").addEventListener("click", addFriend);

document
  .querySelector("#friend")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addFriend();
    }
  });

function resetList() {
  friendsList = [];
  drawnFriends = [];
  document.querySelector("#friendsList").innerHTML = "";
  document.querySelector("#result").innerHTML = "";
  document.querySelector("#friend").value = "";
  document.querySelector("#friend").focus();
}

function addFriend() {
  const nameField = document.querySelector("#friend");
  const name = nameField.value.trim();

  if (name === "") {
    return alert("Digite um nome válido");
  }

  // Verifica nome duplicado (case-insensitive)
  const nameExists = friendsList.some(
    (friend) => friend.name.toLowerCase() === name.toLowerCase()
  );
  if (nameExists) {
    return alert("Este nome já foi adicionado!");
  }

  const friend = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    name: name,
  };

  friendsList.push(friend);
  showFriendsList(friend);

  nameField.value = "";
  nameField.focus();

  return;
}

function showFriendsList(friend) {
  const list = document.querySelector("#friendsList");
  const item = document.createElement("li");
  item.id = friend.id;

  const nameSpan = document.createElement("span");
  nameSpan.textContent = friend.name;
  nameSpan.className = "friend-name";

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";
  buttonGroup.appendChild(createEditButton(friend));
  buttonGroup.appendChild(createRemoveButton(friend.id));

  item.appendChild(nameSpan);
  item.appendChild(buttonGroup);
  list.appendChild(item);

  document.querySelector("#result").innerHTML = "";

  return;
}

function removeFriend(id) {
  friendsList = friendsList.filter((friend) => friend.id !== id);
  document.getElementById(id)?.remove();
  document.querySelector("#result").innerHTML = "";
  document.querySelector("#friend").focus();

  return;
}

function createRemoveButton(id) {
  const removeButton = document.createElement("button");
  removeButton.textContent = "X";
  removeButton.className = "button-remove";
  removeButton.addEventListener("click", function () {
    removeFriend(id);
  });

  return removeButton;
}

function editFriend(friend) {
  const newName = prompt("Digite o novo nome:", friend.name);

  if (newName && newName.trim() !== "") {
    const trimmedNewName = newName.trim();

    const nameExists = friendsList.some(
      (f) =>
        f.id !== friend.id &&
        f.name.toLowerCase() === trimmedNewName.toLowerCase()
    );

    if (nameExists) {
      alert("Este nome já foi adicionado!");
    } else {
      friend.name = trimmedNewName;
      const item = document.getElementById(friend.id);
      item.querySelector(".friend-name").textContent = friend.name;
    }
  } else {
    alert("Nome inválido!");
  }

  document.querySelector("#result").innerHTML = "";
  document.querySelector("#friend").focus();

  return;
}

function createEditButton(friend) {
  const editButton = document.createElement("button");
  editButton.className = "button-edit";

  const icon = document.createElement("img");
  icon.src = "./assets/pencil.svg";
  icon.className = "icon-edit";

  editButton.appendChild(icon);

  editButton.addEventListener("click", function () {
    editFriend(friend);
  });

  return editButton;
}

function drawRandomFriend() {
  if (friendsList.length <= 1) {
    alert("Adicione amigos para sortear!");
    return;
  }

  const availableFriends = friendsList.filter(
    (friend) => !drawnFriends.includes(friend.id)
  );

  if (availableFriends.length === 0) {
    alert("Todos os amigos já foram sorteados! Reiniciando...");
    resetList();
    return;
  }

  const selectedFriend =
    availableFriends[Math.floor(Math.random() * availableFriends.length)];
  drawnFriends.push(selectedFriend.id);

  const result = document.querySelector("#result");
  result.innerHTML = "";

  const item = document.createElement("li");
  item.textContent = selectedFriend.name;
  result.appendChild(item);

  return;
}
