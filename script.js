const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const showBtn = document.querySelector("#show-dialog");
const closeBtn = document.querySelector("#close-dialog");
const myLibrary = [
    new Book("An awesome story", "Alex", 100, "yes"),
    new Book("A bad story", "Bob", 200, "no"),
    new Book("A cool story", "Chris", 300, "no"),
];
const buttons = [];

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

        const removeButton = createRemoveButton(book);
        tr.setAttribute("id", `book-${removeButton.querySelector("button").dataset.bookIndex}`);
        tr.appendChild(removeButton);
        tbody.appendChild(tr);
        buttons.push(removeButton.querySelector("button"));
        addRemoveRowListener(removeButton.querySelector("button"));
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

    const removeButton = createRemoveButton(newBook);
    tr.setAttribute("id", `book-${removeButton.querySelector("button").dataset.bookIndex}`);
    tr.appendChild(removeButton);
    tbody.appendChild(tr);
    buttons.push(removeButton.querySelector("button"));
    addRemoveRowListener(removeButton.querySelector("button"));
}

displayBooks();

function addRemoveRowListener(button) {
    button.addEventListener("click", () => {
        const bookIndex = button.dataset.bookIndex;
        myLibrary.splice(bookIndex, 1);
        const tbody = document.querySelector("tbody");
        const tr = document.querySelector(`#book-${bookIndex}`);
        tbody.removeChild(tr);
        buttons.splice(bookIndex, 1);
        updateIndexes();
    });
}

function updateIndexes() {
    let i = 0;
        for (let button of buttons) {
            const bookIndex = button.dataset.bookIndex;
            const tr = document.querySelector(`#book-${bookIndex}`);
            button.dataset.bookIndex = i;
            tr.setAttribute("id", `book-${i}`);
            i++;
        }
}
