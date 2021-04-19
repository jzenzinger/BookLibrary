class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

//Library array that contains every book with its information
let library = [];

//Setting IDs in HTML to get form values
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const status = document.getElementById('status');
const tableBody = document.getElementById('book-table-body');

const form = document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    render();
    clearForm();
});

const table = document
    .querySelector("table")
    .addEventListener("click", (tmp) => {
    const target = tmp.target.parentNode.parentNode.childNodes[1];
    //console.log(target);  //testing target value
    if (tmp.target.innerHTML == "delete") {
      if (confirm(`Are you sure you want to delete ${target.innerText}?`))
        deleteBook(findBook(library, target.innerText));    //Some issue with findBook ?
    }
    if (tmp.target.classList.contains("status-button")) {
      changeStatus(findBook(library, target.innerText));
    }
    render();
  });

function addBookToLibrary() {
    if (title.value.length === 0 || author.value.length === 0 || pages.value.length === 0) {
        alert("Please, enter information to add new book.");
        return;
    }
    const newBook = new Book(title.value, author.value, pages.value, status.value);

    library.push(newBook);
}

function changeStatus(book) {
    if (library[book].status === "not read") {
        library[book].status = "reading";
    }
    else if (library[book].status === "reading") {
        library[book].status = "read";
    }
    else {
        library[book].status = "not read";
    }
}

function deleteBook(current) {
    library.splice(current, 1);
}

//Some issue maybe
function findBook(array, title) {
    if (array.length === 0 || array === null) {
        return;
    }
    let tmp = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].title === title) {
          return tmp;
        }
        tmp++;
    }
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("status").value = "not read";
}

function render() {
    tableBody.innerHTML = "";

    library.forEach((book) => {
        const htmlBook = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td><button class="status-button">${book.status}</button></td>
                <td><button class="delete">delete</button></td>
            </tr>
            `;
        tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    });
}


