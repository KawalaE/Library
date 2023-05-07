const openModalBtn = document.querySelector(".open-modal");
const modal = document.querySelector("#modal");
const closeModalBtn = document.querySelector(".close-modal");
const submitBtn = document.querySelector(".submit");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const numOfPages = document.querySelector("#num-of-pages");
const bookStatus = document.querySelector("#status");

openModalBtn.addEventListener("click", () => {
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

const myLibrary = [];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}
const book1 = new Book("Misery", "Stephen King", 310, true);

function addToLibrary(book) {
  myLibrary.push(Object.values(book));
}

addToLibrary(book1);

submitBtn.addEventListener("click", () => {
  const userBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    numOfPages.value,
    bookStatus.checked
  );
  addToLibrary(userBook);
});

console.log(myLibrary);
