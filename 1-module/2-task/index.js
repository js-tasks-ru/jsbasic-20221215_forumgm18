/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 * удовлетворяют следующему условию - *имя не пустое, без пробелов, минимум 4 символа*.
 */
function isValid(name) {
  if ( typeof name != 'string' ) return false;
  if ( name.includes(' ') ) return false;
  if ( name.length < 4 )  return false;
  return true;
  // return  !(( typeof name != 'string' ) || ( name.includes(' ') ) || ( name.length < 4 ) || false);
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
