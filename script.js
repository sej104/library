const myLibrary = [
    new Book("A cool story", "Joe", 200, true),
    new Book("A sad story", "Bob", 100, false)
];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = (hasRead) ? 'read' : 'not read yet';
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

displayBooks();