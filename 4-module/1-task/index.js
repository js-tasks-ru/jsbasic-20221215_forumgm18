function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  friends.forEach(el => {
    let li = document.createElement('li');
    li.textContent = `${el.firstName} ${el.lastName}`;
    ul.appendChild(li);
  });
  return ul;
}
function makeFriendsList2(friends) {
  let listUl = friends.reduce((s, el) => s += `<li>${el.firstName} ${el.lastName}</li>`,'');
  let ul = document.createElement('ul');
  ul.innerHTML = listUl;
  return ul;
}
