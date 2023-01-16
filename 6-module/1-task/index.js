/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #tabNode;
  constructor(rows) {
    let tHeadStr = `<thead>
                      <tr>
                        <th>Имя</th>
                        <th>Возраст</th>
                        <th>Зарплата</th>
                        <th>Город</th>
                        <th></th>
                      </tr>
                    </thead>`,

    tabEl = document.createElement('TABLE'),
    tBodyEl = document.createElement('TBODY');

    tabEl.innerHTML = tHeadStr;

    for( let rowItem of rows ) {
      let currentRow = tBodyEl.insertRow();
      Object.values(rowItem).forEach((el, ind) => {
        currentRow.insertCell(ind).innerHTML = el
      });
      let rowBtn = document.createElement('BUTTON');
      rowBtn.innerHTML = 'X';
      rowBtn.addEventListener('click', e => tBodyEl.deleteRow(e.target.closest('tr').rowIndex - 1));
      currentRow.insertCell().append(rowBtn);
      tBodyEl.append(currentRow);
    }
    tabEl.append(tBodyEl);
    this.#tabNode = tabEl;
  }

  get elem(){return this.#tabNode}
}
