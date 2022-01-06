const navLink = document.querySelectorAll('nav li');
const windows = document.querySelectorAll('.window');
const home = document.querySelector('.home');
const displayWindow = () => {
  windows.forEach((window) => window.classList.remove('active'));
}

navLink.forEach((link) => {
  link.addEventListener('click', () => {
    if (link.classList.contains('add-contact')) {
      displayWindow(link)
      const newContact = document.querySelector('.contact-form')
      home.style.display = 'none';
      newContact.classList.add('active');
      document.querySelector('h2').textContent = 'Add new Contact';
    } else if (link.classList.contains('contact-me')) {
      displayWindow(link)
      const aboutMe = document.querySelector('.abt-me')
      home.style.display = 'none';
      aboutMe.classList.add('active');
      document.querySelector('h2').textContent = 'Contact me';
    } else {
      displayWindow(link)
      home.style.display = 'block';
      document.querySelector('h2').textContent = 'All Awesome Book';
    }
  })
})

const date = new Date();
document.querySelector('.date').textContent = date;