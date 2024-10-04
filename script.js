const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const showBtn = document.querySelector("#show-dialog");
const closeBtn = document.querySelector("#close-dialog");
const myLibrary = [
    new Book("A cool story", "Joe", 100, "yes"),
    new Book("A sad story", "Bob", 200, "no"),
];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

showBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
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

function createRemoveButton(book) {
    const td = document.createElement("td");
    const button = document.createElement("button");
    const img = document.createElement("img");

    button.setAttribute("type", "button");
    button.dataset.bookIndex = myLibrary.indexOf(book);
    img.setAttribute("src", "./images/trash-icon.svg");
    img.setAttribute("alt", "Trash icon");
    button.appendChild(img);
    td.appendChild(button);

    return td;
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

        tr.appendChild(createRemoveButton(book));
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

    tr.appendChild(createRemoveButton(newBook));
    tbody.appendChild(tr);
}

displayBooks();

function removeBook() {
    const buttons = document.querySelectorAll("[data-book-index]");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const bookIndex = button.dataset.bookIndex;
            myLibrary.splice(bookIndex, 1);
            const tbody = document.querySelector("tbody");
            while(tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            displayBooks();
        });
    });
}