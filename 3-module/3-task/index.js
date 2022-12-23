function camelize(str) {
  return str.toLowerCase()
          .split('-')
          .map((el, ind) => {
            return ind === 0 ? el : el[0].toUpperCase() + el.slice(1)
            })
          .join('')  
}