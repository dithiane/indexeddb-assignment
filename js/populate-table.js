
let initialTable = true;

function createButtonInRow(tBody, row, type) {

  const newBtn = document.createElement('button');
  if (type=="delete") newBtn.className = "btnDelete"
  else newBtn.className = "btnEdit"
  newBtn.innerText = type;
  row.append(newBtn)
  tBody.append(row);

}

function createNewRow(tBody){
  
  var row = document.createElement('tr');
  tBody.appendChild(row);
  return row;
}
function createNewColumn(row, type){

  var td = document.createElement('td');
  td.innerText = type;
  row.append(td);

}

function createButtonsInRow(tBody, row) {

   // creates a delete button with no functionality
    createButtonInRow(tBody, row, 'delete');

  // creates a delete button with no functionality
    createButtonInRow(tBody, row, 'edit');

}

function findElementByKey(key) {
  if (key.title !== "") {
    var allColumns = document.getElementsByTagName("tr");
    for (let j = 1; j < allColumns.length; j++) {
        var allRows = allColumns[j].children;
        if (allRows[1].innerText == key.title ) {
            debugger;
            return allRows[1];
        } 
      
    } 

  }

}

async function populateTableUI(newUiElement) {

  const tBody = document.querySelector('tbody');
 
  const columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating'];

  if (initialTable) {
    let allBooks = await db.books.where('numberOfPages').aboveOrEqual(0).toArray()
    
    for (let i = allBooks.length - 1; i >= 0; i--) {
      const row = document.createElement('tr');

      for (let j = 0; j < columns.length; j++) {
        var td = document.createElement('td');
        var value = allBooks[i][columns[j]]
        td.innerText = value ? value : null;
        row.append(td);
      }
      createButtonsInRow(tBody, row) 
    }

  } else {
    
    var updateElement = findElementByKey(newUiElement);
    
      if (updateElement) {
        for (let i = 1; i < updateElement.parentElement.children.length; i++) {
          if (updateElement.parentElement.children[i].tagName !== 'BUTTON')
            updateElement.parentElement.children[i].innerText = newUiElement[Object.keys(newUiElement)[i]];
        }
      } else {
        var addRow = createNewRow(tBody); 
          for (let j = 0; j < Object.keys(newUiElement).length; j++) {  
            createNewColumn(addRow, newUiElement[Object.keys(newUiElement)[j]]);
          }
        createButtonsInRow(tBody, addRow);
      }   

  }
  initialTable = false;
  
}
