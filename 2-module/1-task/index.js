function sumSalary(salaries) {
  let res = 0;
  for ( key in salaries) {
    if ( typeof salaries[key] === 'number' && isFinite(salaries[key]) ) {
      res += salaries[key];
    }
  }
  return res;
}

