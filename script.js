const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const clearAll = document.querySelector("[data-js='clearAll']");
const deleteAll = document.querySelector("[data-js='deleteAll']");

function addItem(e) {
  
  e.preventDefault();

  const text = (this.querySelector('[name=item]')).value;

  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {

  platesList.innerHTML = plates.map((plate, index) => {

    return `
      <li>
        <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked' : ''}/>
        <label for="item${index}">${plate.text}</label>
      </li>
    `;

  }).join('');

}

function toggleDone(e) {

  if (!e.target.matches('input')) return; // para a função só ser executada caso o target seja um input
  
  const element = e.target;
  const index = element.dataset.index;

  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function toggleAllUndone() {

  items.forEach((item) => {

    item.done = false;

  })

  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function deleteAllCheckBoxes() {

  const newitems = [];
  localStorage.setItem('items', JSON.stringify(newitems));
  populateList(newitems, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearAll.addEventListener('click', toggleAllUndone);
deleteAll.addEventListener('click', deleteAllCheckBoxes);
populateList(items, itemsList);