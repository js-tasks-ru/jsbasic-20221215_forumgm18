function showSalary(users, age) {
  return users.reduce((s, el, ind) => {
      let toNewStr = ( ind > 0 ) ? '\n' : '';
      let elStr = `${el.name}, ${el.balance}`;
      return s + ((el.age <= age) ? toNewStr + elStr : '');
  }, '');
}