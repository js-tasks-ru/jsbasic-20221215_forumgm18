function factorial(n) {
  console.log('typeof n:', typeof n, 'n:', n, 'parseInt(n): ', parseInt(n) ); // Оставлено специально
  /*
    Вопрос: почему вызов factorial(01221)
    в консоли console.log('n:', n ) выдает:  n: 657 
  */  

  if ( typeof n != 'number' || parseInt(n) != n || n < 0 ) return undefined;

  if ( n <= 1  ) return 1;
  
  let res = 1;
  while ( n > 1) {
    res *= n--;
    // n--
  }

  return res;
}
