const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const showBtn = document.querySelector("#show-dialog");
const closeBtn = document.querySelector("#close-dialog");
const tbody = document.querySelector("tbody");

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

showBtn.addEventListener("click", () => dialog.showModal());

closeBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (event) => {
    event.preventDefault();
    dialog.close();
    addBookToLibrary(new Book(
            event.target.title.value, 
            event.target.author.value, 
            event.target.pages.value, 
            event.target.read.value
        ));
    form.reset();
    displayBooks();
});


function displayBooks() {
    tbody.replaceChildren();

    for (let book of myLibrary) {
        const tr = document.createElement("tr");

        for (let key in book) {
            if (book.hasOwnProperty(key)) {
                const td = document.createElement("td");

                if (key === "read") {
                    const readStatusButton = createReadStatusButton(book);
                    readStatusButton.addEventListener("click", () => {
                        toggleReadStatus(readStatusButton, book);
                    });
                    td.appendChild(readStatusButton);
                } else {
                    td.textContent = book[key];
                }

                tr.appendChild(td);   
            }
        }

        const deleteButton = createDeleteButton(book);
        const td = document.createElement("td");

        deleteButton.addEventListener("click", () => {
            deleteRow(deleteButton);
        });
        td.appendChild(deleteButton)
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

function createReadStatusButton(book) {
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

function createDeleteButton(book) {
    const button = document.createElement("button");
    const img = document.createElement("img");

    button.setAttribute("type", "button");
    button.dataset.bookIndex = myLibrary.indexOf(book);
    img.setAttribute("src", "./images/trash-icon.svg");
    img.setAttribute("alt", "Trash icon");
    button.appendChild(img);

    return button;
}

function toggleReadStatus(button, book) {
    const img = button.querySelector("img");
    book.updateReadStatus();

    if (book.read === "yes") {
        img.setAttribute("src", "./images/check-circle.svg");
        img.setAttribute("alt", "Check icon");
    } else {
        img.setAttribute("src", "./images/x-circle.svg");
        img.setAttribute("alt", "Cancel icon");
    }
}

function deleteRow(button) {
    const bookIndex = button.dataset.bookIndex;
    const tr = button.closest("tr");

    tbody.removeChild(tr);
    myLibrary.splice(bookIndex, 1);
    displayBooks();
}

displayBooks();