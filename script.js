const booksContainer = document.querySelector('.displayBook');
const btn = document.getElementById('button');
const bookName = document.getElementById('name');
const authName = document.getElementById('author');

let bookArray = [];
let id = 0;

// oject constructor for contact

function Book(id, bookName, authName) {
  this.id = id;
  this.bookName = bookName;
  this.authName = authName;
}

// Find the last ID

function lastID(bookArray) {
  if (bookArray.length > 0) {
    id = bookArray[bookArray.length - 1].id;
  } else {
    id = 0;
  }
}

// Add boooks to the DOM

function addNewBook(item) {
  const newAddDiv = document.createElement('div');
  newAddDiv.classList.add('bookItem');
  newAddDiv.id = item.id;
  newAddDiv.innerHTML = `<ul class="book-content">
                              
                              <li>${item.bookName}</li>
                              <li>${item.authName}</li>
                          </ul>
                          <button id="remove">Remove</button>
  `;
  booksContainer.appendChild(newAddDiv);
}

// display bookstore
function getBook() {
  bookArray.forEach((book) => {
    addNewBook(book);
  });
}

// displya available Contact
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('bookstore') === null) {
    bookArray = [];
  } else {
    bookArray = JSON.parse(localStorage.getItem('bookstore'));
    lastID(bookArray);
  }
  getBook();
});

// clear inputs

function clearInputs() {
  bookName.value = '';
  authName.value = '';
}

// checkInputs

function checkInput(inputArr) {
  for (let i = 0; i < inputArr.length; i += 1) {
    if (inputArr[i].value === '') {
      return false;
    }
  }
  return true;
}

// add book

btn.addEventListener('click', () => {
  if (checkInput([bookName, authName])) {
    id += 1;
    const book = new Book(id, bookName.value, authName.value);
    bookArray.push(book);
    localStorage.setItem('bookstore', JSON.stringify(bookArray));
    clearInputs();
    addNewBook();
  }
});

// Delete book

booksContainer.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    const bookItem = e.target.parentElement;
    booksContainer.removeChild(bookItem);
    const newBookArray = bookArray.filter((event) => event.id !== Number(bookItem.id));
    bookArray = newBookArray;
    localStorage.setItem('bookstore', JSON.stringify(bookArray));
  }
});