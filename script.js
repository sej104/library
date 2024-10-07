const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const showBtn = document.querySelector("#show-dialog");
const closeBtn = document.querySelector("#close-dialog");
const removeButtons = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.updateReadStatus = function() {
    this.read = (this.read === "yes") ? "no" : "yes";
}

const myLibrary = [
    new Book("An awesome story", "Alex", 100, "yes"),
    new Book("A bad story", "Bob", 200, "no"),
    new Book("A cool story", "Charlie", 300, "no"),
];

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

function createReadButton(book) {
    const button = document.createElement("button");
    const img = document.createElement("img");

    if (book.read === "yes") {
        img.setAttribute("src", "./images/check-circle.svg");
        img.setAttribute("alt", "Check icon");
    } else {
        img.setAttribute("src", "./images/x-circle.svg");
        img.setAttribute("alt", "Cancel icon");
    }

    button.setAttribute("type", "button");
    button.appendChild(img);
    return button;
}

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

function addReadStatusListener(button, book) {
    button.addEventListener("click", () => {
        const img = button.querySelector("img");
        book.updateReadStatus();

        if (book.read === "yes") {
            img.setAttribute("src", "./images/check-circle.svg");
            img.setAttribute("alt", "Check icon");
        } else {
            img.setAttribute("src", "./images/x-circle.svg");
            img.setAttribute("alt", "Cancel icon");
        }
    });
}

function addRemoveRowListener(button) {
    button.addEventListener("click", () => {
        const bookIndex = button.dataset.bookIndex;
        const tbody = document.querySelector("tbody");
        const tr = document.querySelector(`#book-index-${bookIndex}`);

        tbody.removeChild(tr);
        myLibrary.splice(bookIndex, 1);
        removeButtons.splice(bookIndex, 1);
        updateIndexes();
    });
}

function updateIndexes() {
    for (let i = 0; i < removeButtons.length; i++) {
        const bookIndex = removeButtons[i].dataset.bookIndex;
        const tr = document.querySelector(`#book-index-${bookIndex}`);

        removeButtons[i].dataset.bookIndex = i;
        tr.setAttribute("id", `book-index-${i}`);
    }
}

function displayBooks() {
    const tbody = document.querySelector("tbody");

    for (let book of myLibrary) {
        const tr = document.createElement("tr");

        for (let key in book) {
            if (book.hasOwnProperty(key)) {
                const td = document.createElement("td");

                if (key === "read") {
                    const readButton = createReadButton(book);
                    addReadStatusListener(readButton, book);
                    td.appendChild(readButton);
                } else {
                    td.textContent = book[key];
                }

                tr.appendChild(td);   
            }
        }

        const removeButton = createRemoveButton(book);
        removeButtons.push(removeButton.querySelector("button"));
        addRemoveRowListener(removeButton.querySelector("button"));

        tr.setAttribute("id", `book-index-${removeButton.querySelector("button").dataset.bookIndex}`);
        tr.appendChild(removeButton);
        tbody.appendChild(tr);
    }
}

function displayNewBook() {
    const tbody = document.querySelector("tbody");
    const tr = document.createElement("tr");
    const newBook = myLibrary[myLibrary.length - 1];

    for (let key in newBook) {
        if (newBook.hasOwnProperty(key)) {
            const td = document.createElement("td");

            if (key === "read") {
                const readButton = createReadButton(newBook);
                addReadStatusListener(readButton, newBook);
                td.appendChild(readButton);
            } else {
                td.textContent = newBook[key];
            }
    
            tr.appendChild(td);
        }
    }

    const removeButton = createRemoveButton(newBook);
    removeButtons.push(removeButton.querySelector("button"));
    addRemoveRowListener(removeButton.querySelector("button"));

    tr.setAttribute("id", `book-index-${removeButton.querySelector("button").dataset.bookIndex}`);
    tr.appendChild(removeButton);
    tbody.appendChild(tr);
}

displayBooks();