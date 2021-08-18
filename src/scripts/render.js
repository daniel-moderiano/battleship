const tables = document.querySelectorAll('.board__table');

function createTable(table) {
  let count = 0;
  for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');
    tr.classList.add('board__row');
    table.appendChild(tr);
    for (let j = 0; j < 10; j++) {
      const td = document.createElement('td');
      td.classList.add('board__cell');
      td.dataset.coordinate = count;
      tr.appendChild(td);
      count += 1;
    }
  }
}
