const openModalBtn = document.querySelector(".open-modal");
const modal = document.querySelector("#modal");
const closeModalBtn = document.querySelector(".close-modal");
const submitBtn = document.querySelector(".submit");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const numOfPages = document.querySelector("#num-of-pages");
const bookStatus = document.querySelector("#status");
const cards = document.getElementById("cards");
const titleOutline = document.querySelector("#title.text-input");
const authorOutline = document.querySelector("#author.text-input");
const numberOutline = document.querySelector("#num-of-pages.text-input");

function updateLocalStorage(data) {
  localStorage.setItem("books", JSON.stringify(data));
}

class Book {
  static myLibrary = [];

  constructor(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
  }

  addToLibrary() {
    Book.myLibrary.push(this);
    updateLocalStorage(Book.myLibrary);
  }

  removeBook() {
    Book.myLibrary = Book.myLibrary.filter((book) => book.title !== this.title);
    updateLocalStorage(Book.myLibrary);
  }
}

function getDataFromStorage() {
  const storageLibrary = JSON.parse(localStorage.getItem("books"));
  const updatedLibrary = [];
  storageLibrary.forEach((book) => {
    const bookInstance = new Book(
      book.title,
      book.author,
      book.numberOfPages,
      book.read
    );
    updatedLibrary.push(bookInstance);
  });
  return updatedLibrary;
}

function resetModal() {
  bookTitle.value = "";
  bookAuthor.value = "";
  numOfPages.value = "";
  bookStatus.checked = false;
  titleOutline.classList.remove("form-fail");
  authorOutline.classList.remove("form-fail");
  numberOutline.classList.remove("form-fail");
}

function createModal() {
  openModalBtn.addEventListener("click", () => {
    resetModal();
    modal.showModal();
  });
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });
}

function bookStatusCheck(cardInfo, buttonInfo, book) {
  if (cardInfo.textContent === "true") {
    cardInfo.textContent = "Already read!";
    buttonInfo.textContent = "Not read";
    buttonInfo.classList.remove("success");
    buttonInfo.classList.add("fail");
  } else {
    cardInfo.textContent = "Not read yet :(";
    buttonInfo.textContent = "Read";
    buttonInfo.classList.remove("fail");
    buttonInfo.classList.add("success");
  }
  buttonInfo.addEventListener("click", () => {
    if (buttonInfo.textContent === "Not read") {
      buttonInfo.textContent = "Read";
      buttonInfo.classList.remove("fail");
      buttonInfo.classList.add("success");
      book.read = false;
      cardInfo.textContent = "Not read yet :(";
    } else {
      buttonInfo.textContent = "Not read";
      buttonInfo.classList.remove("success");
      buttonInfo.classList.add("fail");
      book.read = true;
      cardInfo.textContent = "Already read!";
    }
    updateLocalStorage(Book.myLibrary);
  });
}
function removeBookCard(removeBtn, card, bookObj) {
  removeBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this book?")) {
      bookObj.removeBook();
      card.remove();
    }
  });
}
createModal();
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
  bookStatusCheck(cardStatus, statusButton, book);
  removeButton.classList.add("remove");
  removeButton.textContent = "Remove";
  removeBookCard(removeButton, card, book);
  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  card.appendChild(cardStatus);
  card.appendChild(buttons);
  buttons.appendChild(removeButton);
  buttons.appendChild(statusButton);
}
function displayStorageBooks() {
  Book.myLibrary.forEach((book) => {
    addBookCard(book);
  });
}
function isValid(data) {
  if (data.value === "") {
    return false;
  }
  if (data.type === "number") {
    return Number.isInteger(Number(data.value));
  }
  return true;
}
function submitBook() {
  submitBtn.addEventListener("click", () => {
    const userBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      numOfPages.value,
      bookStatus.checked
    );

    if (isValid(bookTitle) && isValid(bookAuthor) && isValid(numOfPages)) {
      userBook.addToLibrary();
      addBookCard(userBook);
    }
  });
}
submitBook();
function createExampleBook() {
  if (JSON.parse(localStorage.getItem("books")) === null) {
    const book1 = new Book("Misery", "Stephen King", 310, true);
    book1.addToLibrary();
    updateLocalStorage(Book.myLibrary);
  }
}
function themeHandler() {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  let theme = localStorage.getItem("theme");
  if (theme === null) {
    if (darkThemeMq.matches) {
      document.querySelector("body").classList.remove("light");
      document.querySelector("body").classList.add("dark");
      document.getElementById("book-logo").src = "Pictures/book-dark.svg";
      theme = "dark";
    } else {
      document.querySelector("body").classList.remove("dark");
      document.querySelector("body").classList.add("light");
      document.getElementById("book-logo").src = "Pictures/book.svg";
      theme = "light";
    }
  } else if (theme === "dark") {
    document.querySelector("body").classList.remove("light");
    document.querySelector("body").classList.add("dark");
    document.getElementById("book-logo").src = "Pictures/book-dark.svg";
  } else if (theme === "light") {
    document.querySelector("body").classList.remove("dark");
    document.querySelector("body").classList.add("light");
    document.getElementById("book-logo").src = "Pictures/book.svg";
  }
  localStorage.setItem("theme", theme);

  document.querySelector(".theme-switch").addEventListener("click", () => {
    if (theme === "dark") {
      document.querySelector("body").classList.remove("dark");
      document.querySelector("body").classList.add("light");
      document.getElementById("book-logo").src = "Pictures/book.svg";
      theme = "light";
    } else if (theme === "light") {
      document.querySelector("body").classList.remove("light");
      document.querySelector("body").classList.add("dark");
      document.getElementById("book-logo").src = "Pictures/book-dark.svg";
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  });
}
createExampleBook();
Book.myLibrary = getDataFromStorage() || [];
displayStorageBooks();
themeHandler();
