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
// display bookstore
function getBook() {
  bookArray.forEach((book) => {
    addNewBook(book);
  });
}

// Find the last ID

function lastID(bookArray) {
  bookArray.length > 0 ? id = bookArray[bookArray.length - 1].id : id = 0;
}

// add book

btn.addEventListener('click', () => {
  if (checkInput([bookName, authName])) {
    id++;
    const book = new Book(id, bookName.value, authName.value);
    bookArray.push(book);
    localStorage.setItem('bookstore', JSON.stringify(bookArray));
    clearInputs();
    addNewBook();
  }
});

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
