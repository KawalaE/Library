const openModalBtn = document.querySelector('.open-modal');
const modal = document.querySelector('#modal');
const closeModalBtn = document.querySelector('.close-modal');

openModalBtn.addEventListener('click', ()=> {
  modal.showModal();
});

closeModalBtn.addEventListener('click', () => {
  modal.close();
});

const myLibrary = [];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}


