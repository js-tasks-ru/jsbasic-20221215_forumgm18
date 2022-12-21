function factorial(n) {
  console.log('typeof n:', typeof n, 'n:', n, 'parseInt(n): ', parseInt(n) );

  if ( typeof n != 'number' || parseInt(n) != n || n < 0 ) return undefined;

  if ( n <= 1  ) return 1;
  let res = 1;
  while ( n > 1) {
    res *= n--;
    // n--
  }

  return res;
}
