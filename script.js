const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const showBtn = document.querySelector("#show-dialog");
const closeBtn = document.querySelector("#close-dialog");
const tbody = document.querySelector("tbody");

class Book {
    static myLibrary = [
        new Book("An awesome story", "Alex", 100, "yes"),
        new Book("A bad story", "Bob", 200, "no"),
        new Book("A cool story", "Charlie", 300, "no"),
    ];

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    static addBookToLibrary(book) {
        this.myLibrary.push(book);
    }

    static createReadStatusButton(book) {
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

    updateReadStatus() {
        this.read = (this.read === "yes") ? "no" : "yes";
    }

    static toggleReadStatus(button, book) {
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

    static createDeleteButton(book) {
        const button = document.createElement("button");
        const img = document.createElement("img");
    
        button.setAttribute("type", "button");
        button.dataset.bookIndex = this.myLibrary.indexOf(book);
        img.setAttribute("src", "./images/trash-icon.svg");
        img.setAttribute("alt", "Trash icon");
        button.appendChild(img);
    
        return button;
    }

    static deleteRow(button) {
        const bookIndex = button.dataset.bookIndex;
        const tr = button.closest("tr");
    
        tbody.removeChild(tr);
        this.myLibrary.splice(bookIndex, 1);
        this.displayBooks();
    }

    static displayBooks() {
        tbody.replaceChildren();

        for (let book of this.myLibrary) {
            const tr = document.createElement("tr");
    
            for (let key in book) {
                if (book.hasOwnProperty(key)) {
                    const td = document.createElement("td");
    
                    if (key === "read") {
                        const readStatusButton = this.createReadStatusButton(book);
                        readStatusButton.addEventListener("click", () => {
                            this.toggleReadStatus(readStatusButton, book);
                        });
                        td.appendChild(readStatusButton);
                    } else {
                        td.textContent = book[key];
                    }
    
                    tr.appendChild(td);   
                }
            }
    
            const deleteButton = this.createDeleteButton(book);
            const td = document.createElement("td");
    
            deleteButton.addEventListener("click", () => {
                this.deleteRow(deleteButton);
            });
            td.appendChild(deleteButton)
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }
}

showBtn.addEventListener("click", () => dialog.showModal());

closeBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (event) => {
    event.preventDefault();
    dialog.close();
    Book.addBookToLibrary(new Book(
        event.target.title.value, 
        event.target.author.value, 
        event.target.pages.value, 
        event.target.read.value
    ));
    form.reset();
    Book.displayBooks();
});

Book.displayBooks();