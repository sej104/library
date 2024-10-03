const myLibrary = [
    new Book("A cool story", "Joe", 200, "yes"),
    new Book("A sad story", "Bob", 100, "no")
];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.blah = "blah"
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const tbody = document.querySelector("tbody");

    for (let book of myLibrary) {
        const tr = document.createElement("tr");

        for (let key in book) {
            const td = document.createElement("td");
            td.textContent = book[key];
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

function displayNewBook() {
    const tbody = document.querySelector("tbody");
    const newBook = myLibrary[myLibrary.length - 1];
    const tr = document.createElement("tr");

    for (let key in newBook) {
        const td = document.createElement("td");
        td.textContent = newBook[key];
        tr.appendChild(td);
    }

    tbody.appendChild(tr);
}

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const showBtn = document.querySelector("#show-dialog");
const closeBtn = document.querySelector("#close-dialog");

showBtn.addEventListener("click", () => {
    dialog.showModal();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    dialog.close();
    addBookToLibrary(new Book(
            event.currentTarget.title.value, 
            event.currentTarget.author.value, 
            event.currentTarget.pages.value, 
            event.currentTarget.read.value
        ));
    form.reset();
    displayNewBook();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});

displayBooks();