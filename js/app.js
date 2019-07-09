var updateFlag = false;

function onDatabaseReady() {
    populateTableUI({},true) // DO NOT TOUCH THIS LINE until step #4-5

    console.log(`This is our database: `, db);
    // DexieJS docs: https://dexie.org/
}

document.addEventListener('click', function(event) {

    var bookTitle;
    if (event.target.tagName.toLowerCase() === 'button') {
        
        if (event.target.textContent == "delete") {
            bookTitle = event.target.parentElement.children[1].innerText;
            deleteBook(bookTitle,event);  
        }
        if (event.target.textContent == "edit") {
            editBook(event)   
        }
    }

});

async function deleteBook(bookTitle,event) {

    // See #1: YOUR CODE HERE
    
    await db.books
    .where('title').equals(bookTitle).delete()
    .then((countDeleted) => {
        console.log ("Deleted " + countDeleted + " rows : " + bookTitle);
        var deletedRow = event.target.parentElement.closest('tr');
        deletedRow.parentElement.removeChild(deletedRow)})
    .catch(() => console.error("Error: " + error))

}

async function addBook(event) {

    // See #2: YOUR CODE HERE

    // Hint: Once you've added the book to your database, call populateTableUI with the added book's title
    // Check out the Table.put() method and what it returns at: https://dexie.org/docs/Table/Table.put()
    event.preventDefault();
    if (document.getElementById("inputTitle").value) {
        let objBook = {
            cover: document.getElementById("inputCover").value,
            title : document.getElementById("inputTitle").value,
            author : document.getElementById("inputAuthor").value,
            numberOfPages : Number(document.getElementById("inputPages").value),
            synopsis: document.getElementById("inputSynopsis").value,
            publishDate : document.getElementById("inputDate").value,
            rating : Number(document.getElementById("inputRating").value),
        }
        
        await db.books
        .put(objBook)
        .then((countAddedUpdated) => {
            console.log ("Added/Updated " + countAddedUpdated + " rows: " + objBook.title)
            populateTableUI(objBook);
            clearFields(event);
        })
        .catch(() => console.error("Error: " + error)) 
    }

}


function editBook(event) {

    // See #3. YOUR CODE HERE
    
    event.preventDefault();
    document.getElementById("inputTitle").value = event.target.parentElement.children[1].innerText;
    document.getElementById("inputAuthor").value = event.target.parentElement.children[2].innerText;
    document.getElementById("inputPages").value = Number(event.target.parentElement.children[3].innerText);
    document.getElementById("inputCover").value = event.target.parentElement.children[0].innerText;
    document.getElementById("inputSynopsis").value = event.target.parentElement.children[4].innerText;
    document.getElementById("inputDate").value = event.target.parentElement.children[5].innerText;
    document.getElementById("inputRating").value = Number(event.target.parentElement.children[6].innerText);
    

}

function clearFields(event) {

    event.preventDefault();
    document.getElementById("inputTitle").value = '';
    document.getElementById("inputAuthor").value = '';
    document.getElementById("inputPages").value = 0;
    document.getElementById("inputCover").value = '';
    document.getElementById("inputSynopsis").value = '';
    document.getElementById("inputDate").value = ''
    document.getElementById("inputRating").value = 0;

}


// ************ 4. (BONUS) There is a bug in the 'populateTableUI' function... see if you can find it and update the function ************

// ************ 5. (BONUS #2) Comment out line 67 in ../index.HTML and write your own 'populateTableUI' function in app.js ************


// Now that you’ve cloned your project lets start by testing our code. Let's start live 
//server and open up our project in the browser. Open up your console and you should see 
//some logs outputting book objects. These object are predefined in books.json and added to
//our database called library_database in indexedDB. We can also navigate to the 
//application tab in the chrome console (storage in firefox) and take a look at the indexedDB 
//storage We created this for you in indexedDB.js if you feel inclined to take a look. 

// We've populated the table so the UI reflects what's currently in our local 
// library_database in indexedDB.  We've logged the database above so you can see exactly 
// what you're working with


// 1.) Now add functionality to remove a row  which will need remove the object from the books store in 
//indexedDB database as well as the UI once the delete operation is complete. This will take some 
//effort on the UI. Use the title as your UID (Unique identifier) which you can find in the application console
//in Chrome (storage in Firefox). 

// 2.) From here we want to be able to add a book. Hook up the form below the table to add a 
//book to the books store in indexedDB and auto-update the table without refreshing the page.
//Hint: This add operation is on the front page of DexieJS.  Both is and Table.put() can be 
// used to add this book. 


// 3.) Now make each table row editable and update the database when the edit is complete. This will
//take a lot of effort from the html to the js. Use the title as your UID (Unique identifier)
//which you can find in the application console   


