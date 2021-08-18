const tables = document.querySelectorAll('.board__table');

function createTable(table) {
  for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    for (let j = 0; j < 10; j++) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
  }
}

tables.forEach((table) => {
  createTable(table);
});

