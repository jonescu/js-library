// Variables

const libraryContainer = document.querySelector('.library-container')
const addBookBtn = document.getElementById('add-book')
const bookForm = document.querySelector('.book-form')
const bookTitle = document.getElementById('book-title')
const bookAuthor = document.getElementById('book-author')
const bookPages = document.getElementById('book-pages')
const readSelector = document.getElementById('read-selector')
const confirmAddBtn = document.getElementById('confirm-add-button')

class Book {
  constructor(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
  }
}

const library = {
  books: getBooksFromStorage()
}

function populateUI(){
  let html = ''
  library.books.forEach(book => {
      html += `<div class="book-card">
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.status}</p>
      <p>Id: ${book.id}</p>
      <a class="delete-btn">
        <i class="las la-trash"></i>
      </a>
      <button class="toggle-read-button">${book.status}</button>
      </div>`
  })
  libraryContainer.innerHTML = html
}

window.addEventListener('DOMContentLoaded', populateUI)

function showForm(){
  bookForm.style.visibility = 'visible'
}
addBookBtn.addEventListener('click', showForm)

function createBook(){
  if(bookTitle.value === '' || bookAuthor.value === '' || bookPages.value === '' || readSelector.value === '') {
    alert('please fill in all fields')
    return false
  } 

  // Create book
  const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readSelector.value)

  // Assign ID
  if(library.books.length !== 0) {
    newBook.id = library.books.length
  } else {
    newBook.id = 0
  }

  // Persist to LS
  storeBook(newBook)

  // Push to Library
  library.books.push(newBook)

  // Display in UI
  displayBook(newBook)

  // Hide form
  bookForm.style.visibility = 'hidden'
}

confirmAddBtn.addEventListener('click', createBook)

function displayBook(book){

  // Create book card
  const bookCard = document.createElement('div')

  let array = []

  // Push object into array and capitalize first letter of each key
  for(let key in book) {
   const text = key.charAt(0).toUpperCase() + key.substring(1).toLowerCase() + ": " + `${book[key]}`
   array.push(text)
  }

  // Create a P element for each array element
  array.forEach(function(element) {
   const newP = document.createElement('p')
   newP.textContent = element
   bookCard.appendChild(newP)
  })

  const deleteBtn = document.createElement('a')

  const readBtn = document.createElement('button')
   
  // Add class to card
  bookCard.classList.add('book-card')

  // Create delete icon
  deleteBtn.innerHTML = `<i class="las la-trash"></i>`

  // Add class
  deleteBtn.classList.add('delete-btn')

  // Add class
  readBtn.classList.add('toggle-read-button')

  // Add text content
  readBtn.textContent = readSelector.value

  // Append card, trash icon, and button to library
  bookCard.appendChild(deleteBtn)
  bookCard.appendChild(readBtn)
  libraryContainer.appendChild(bookCard)

  // Clear fields
  bookTitle.value = ''
  bookAuthor.value = ''
  bookPages.value = ''
}

libraryContainer.addEventListener('click', deleteBookFromLibrary)

function deleteBookFromLibrary(e) {
  if(e.target.parentElement.classList.contains('delete-btn')){
    // Remove from UI
    e.target.parentElement.parentElement.remove()
    // Get id
    const IDString = e.target.parentElement.previousElementSibling.textContent.split(':')
    const id = IDString[1]
    // Remove from library
    library.books.splice(id, 1)
    // Delete from LS
    deleteFromStorage(parseInt(id))
  }
  e.preventDefault()
}

libraryContainer.addEventListener('click', toggleRead)

// Toggle read status
function toggleRead(e){
  if(e.target.classList.contains('toggle-read-button')) {
    if(e.target.textContent === "Read") {
      e.target.textContent = "Not Read"
      e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent = "Status: Not Read" 
    } else {
      e.target.textContent = "Read"
      e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent = "Status: Read" 
    }
  }
e.preventDefault()
}

// Local Storage
function storeBook(book){
  let books;
  if(localStorage.getItem('books') === null) {
    books = []
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  } else {
    books = JSON.parse(localStorage.getItem('books'))
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }
}

function getBooksFromStorage(){
  let books
  if(localStorage.getItem('books') === null){
      books = []
  } else {
      books = JSON.parse(localStorage.getItem('books'))
  }
  return books
}

function deleteFromStorage(id){
    let books = JSON.parse(localStorage.getItem('books'))
    books.forEach(book => {
        if(book.id === id){
            books.splice(book.id, 1)
        }
        localStorage.setItem('books', JSON.stringify(books))
    })
}
