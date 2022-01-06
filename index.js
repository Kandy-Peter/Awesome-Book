class Book {
  constructor() {
    this.bookArray = localStorage.getItem('bookstore') ? JSON.parse(localStorage.getItem('bookstore')) : [];
  }

  addNewBook(book) {
    this.bookArray.push(book);
    localStorage.setItem('bookstore', JSON.stringify(this.bookArray));
  }

  removeBook(id) {
    this.bookArray = this.bookArray.filter((book) => book.id !== Number(id));
    localStorage.setItem('bookstore', JSON.stringify(this.bookArray));
  }
}

const booksContainer = document.querySelector('.displayBook');
const btn = document.getElementById('button');
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookList = new Book();
const newBooks = bookList.bookArray;

function displayBook(book) {
  const newAddDiv = document.createElement('div');
  const booksContainer = document.querySelector('.displayBook');
  newAddDiv.classList.add('bookItem');
  newAddDiv.id = book.id;
  newAddDiv.innerHTML = `<ul class="book-content">   
                              <li class = "title">${book.title}</li>
                              <li>${book.author}</li>
                          </ul>
                          <button id="remove">Remove</button>
  `;
  booksContainer.appendChild(newAddDiv);
}

newBooks.forEach((book) => {
  displayBook(book);
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (title.value !== '' || author.value !== '') {
    const id = Date.now();
    const book = {
      id,
      title: title.value,
      author: author.value
    };
    title.value = '';
    author.value = '';
    bookList.addNewBook(book);
    displayBook(book);
  }
});

booksContainer.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    const element = e.target.parentNode;
    bookList.removeBook(element.id);
    element.remove();
  }
})