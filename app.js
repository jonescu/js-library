
  
const bookBtn = document.getElementById('book-btn')
const container = document.querySelector('.container')
const modal = document.querySelector('.modal')
const submitBtn = document.querySelector('#submit')
const author = document.getElementById('author')
const title = document.getElementById('title')
const pages = document.getElementById('pages')
const read = document.getElementById('read')

let myLibrary = [
  
];
//book constructor
function Book(author, title, pages) {
    this.author = author
    this.title = title
    this.pages = pages
}

function displayBooks(array) {
  //make new object on click and add to library array
  const myBook = new Book(author.value, title.value, pages.value);
  myLibrary.push(myBook)

  //create card
  const newCard = document.createElement('div');
  newCard.classList.add('book-card')

  //remove book from library when clicked
  const removeBook = document.createElement('button')
  removeBook.classList.add('remove-btn')
  removeBook.textContent = "Remove Book"
  removeBook.addEventListener('click', function(e) {
    e.target.parentElement.style.display = 'none'
  })

  //remove special characters from json except : and , 
  contents = JSON.stringify(myBook, null, 10).replace(/[`~!@#$%^&*()_|+\-=?;'".<>\{\}\[\]\\\/]/gi, '')

  //add object contents onto new element, display on screen
  newCard.textContent = contents;
  container.appendChild(newCard)
  newCard.appendChild(removeBook)
  
  //assign button class based on whether user has read the book or not.
  //toggle class when clicked
  const readBookBtn = document.createElement('button');
  if(read.checked) {
    readBookBtn.textContent = "Read"
    readBookBtn.classList.add('button-read')
    newCard.appendChild(readBookBtn)
  } else {
    readBookBtn.textContent = "Not Read"
    readBookBtn.classList.add('button-notRead')
    newCard.appendChild(readBookBtn)
  }
  readBookBtn.addEventListener('click', function(){
    if(readBookBtn.className === "button-read") {
      readBookBtn.classList.remove('button-read')
      readBookBtn.classList.add('button-notRead')
      readBookBtn.textContent = 'Not Read'
    } else {
      readBookBtn.classList.remove('button-notRead')
      readBookBtn.classList.add('button-read')
      readBookBtn.textContent = 'Read'
    }
  }) 
}

// Show Modal
bookBtn.addEventListener('click', function() {
  modal.style.display = 'block'
  author.value = ''
  title.value = ''
  pages.value = ''
  read.checked = false;
})

//Hide Modal, check if inputs are empty
submitBtn.addEventListener('click', function() {
  if(author.value == '' || title.value == '' || pages.value == '' ) {
  } else {
    displayBooks(myLibrary)
    modal.style.display = 'none'
};
})