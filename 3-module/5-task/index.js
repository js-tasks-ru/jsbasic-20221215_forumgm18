function getMinMax(str) {
  const arrNumbers = str
                      .split(' ')
                      .map( el => parseFloat(el) )
                      .filter( el => !Number.isNaN(el) );
  return { 
            min: Math.min(...arrNumbers), 
            max: Math.max(...arrNumbers)
         }
}
