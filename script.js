const openModalBtn = document.querySelector(".open-modal");
const modal = document.querySelector("#modal");
const closeModalBtn = document.querySelector(".close-modal");
const submitBtn = document.querySelector(".submit");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const numOfPages = document.querySelector("#num-of-pages");
const bookStatus = document.querySelector("#status");
const cards = document.getElementById("cards");
const titleOutline = document.querySelector(".text-input");

let myLibrary = [];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

openModalBtn.addEventListener("click", () => {
  modal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
});

const book1 = new Book("Misery", "Stephen King", 310, true);

function addToLibrary(book) {
  myLibrary.push(book);
}
addToLibrary(book1);

function addBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  cards.appendChild(card);
  const cardTitle = document.createElement("div");
  const cardAuthor = document.createElement("div");
  const cardPages = document.createElement("div");
  const cardStatus = document.createElement("div");
  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  cardPages.textContent = `${book.numberOfPages} pages`;
  cardStatus.textContent = book.read;
  const buttons = document.createElement("div");
  buttons.classList.add("card-buttons");
  const removeButton = document.createElement("button");
  const statusButton = document.createElement("button");
  statusButton.classList.add("status-btn");
  statusButton.textContent = "Not read";
  statusButton.classList.add("fail");
  statusButton.addEventListener("click", () => {
    if (statusButton.textContent === "Not read") {
      statusButton.textContent = "Read";
      statusButton.classList.remove("fail");
      statusButton.classList.add("success");
      cardStatus.textContent = true;
    } else {
      statusButton.textContent = "Not read";
      statusButton.classList.remove("success");
      statusButton.classList.add("fail");
      cardStatus.textContent = false;
    }
  });
  removeButton.classList.add("remove");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    myLibrary = myLibrary.splice(myLibrary.indexOf(book), 1);
    card.remove();
  });

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  card.appendChild(cardStatus);
  card.appendChild(buttons);
  buttons.appendChild(removeButton);
  buttons.appendChild(statusButton);
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    numOfPages.value,
    bookStatus.checked
  );
  addToLibrary(userBook);
  addBookCard(userBook);
});

addBookCard(book1);
console.log(myLibrary);
