function highlight(table) {
  let arrHeadCellsValues = Array.prototype.map.call(table.tHead.rows[0].cells, el => el.textContent),
      indexOfAge = arrHeadCellsValues.indexOf('Age'),
      indexOfGender = arrHeadCellsValues.indexOf('Gender'),
      indexOfStatus = arrHeadCellsValues.indexOf('Status');

  for ( row of table.tBodies[0].rows ) {
    if ( +row.cells[indexOfAge].textContent < 18 ) {
      row.style.textDecoration = 'line-through'
    }

    let newClass = row.cells[indexOfGender].textContent === 'm' ? 'male' : 'female';
    row.classList.add(newClass);

    switch( row.cells[indexOfStatus].dataset.available ) {
      case 'true':
        row.classList.add('available');
        break;
      case 'false':
        row.classList.add('unavailable');
        break;
      default: 
        row.hidden = true;
    }

  };
}
