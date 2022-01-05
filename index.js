let bookArray = [];

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static lastID(bookArray) {
    if (bookArray.length > 0) {
      this.id = bookArray[bookArray.length - 1].id;
    } else {
      this.id = 0;
    }
  }

  static addNewBook(book) {
    const newAddDiv = document.createElement('div');
    const booksContainer = document.querySelector('.displayBook');
    newAddDiv.classList.add('bookItem');
    newAddDiv.id = book.id;
    newAddDiv.innerHTML = `<ul class="book-content">   
                                <li>${book.title}</li>
                                <li>${book.author}</li>
                            </ul>
                            <button id="remove">Remove</button>
    `;
    booksContainer.appendChild(newAddDiv);
  }

  static clearInputs() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static checkInput(inputArr) {
    for (let i = 0; i < inputArr.length; i += 1) {
      if (inputArr[i].value === '') {
        return false;
      }
    }
    return true;
  }
}

const booksContainer = document.querySelector('.displayBook');
const btn = document.getElementById('button');
const title = document.getElementById('title');
const author = document.getElementById('author');

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('bookstore') === null) {
    bookArray = [];
  } else {
    bookArray = JSON.parse(localStorage.getItem('bookstore'));
    Book.lastID(bookArray);
  }
  bookArray.forEach((book) => {
    Book.addNewBook(book);
  });
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (Book.checkInput([title, author])) {
    Book.id = Math.random().toString(36).slice(2);
    const book = new Book(Book.id, title.value, author.value);
    bookArray.push(book);
    localStorage.setItem('bookstore', JSON.stringify(bookArray));
    Book.clearInputs();
    Book.addNewBook(book);
  }
});

booksContainer.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    const bookItem = e.target.parentElement;
    booksContainer.removeChild(bookItem);
    const newBookArray = bookArray.filter((event) => event.id !== bookItem.id);
    bookArray = newBookArray;
    localStorage.setItem('bookstore', JSON.stringify(bookArray));
  }
});
