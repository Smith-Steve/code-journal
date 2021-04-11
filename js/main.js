/* global data */
/* exported data */

var $photoElement = document.getElementById('photo_url');
var $form = document.getElementById('data-entry-form');
var imageElement = document.querySelector('img');
var imageUrl = 'images/placeholder-image-square.jpg';
var $containerNodeList = document.querySelectorAll('.container');
var $button = document.getElementById('button1');
var $icon = document.getElementById('i');
var $parentListener = document.getElementById('parent-listener');
var $titleField = document.getElementById('title');
var $photoField = document.getElementById('photo_url');
var $notesField = document.getElementById('notes');
var entryId = 0;

var $lineItem = document.querySelector('.parent-of-entries');

function handleImage(event) {
  if ($photoElement.value !== null) {
    imageUrl = $photoElement.value;
    imageElement.setAttribute('src', imageUrl);
  }
}

function handleForm(event) {
  handleViewChange(event);
  var boolHandleForm = (event.path[5].window.entryId !== 0); // entryId equals 0 at the time the form is submitted. We can therefore determine whether or not we are currently working with a form that is 'new' or 'used' based off of this criterion.
  // we are then in an ideal place to work with a bool or whatever is best for a basic decision statement.
  var entryArray = event.path[5].window.data.entries;
  event.preventDefault();
  if(boolHandleForm === true) {
    var userInput = {
      title: $form.elements.title.value,
      photo: $form.elements.photo_url.value,
      notes: $form.elements.notes.value,
      entryID: entryId }
    for (var i = 0; i < entryArray.length; i++) {
      var entry = entryArray[i];
      if (entry.entryID == entryId) { // these are two different data types so we have to do a 'double' equals instead of a triple.
        entryArray.splice(i, 1, userInput);
      }
    }
    viewEntries(event);
    $form.reset();
  } else {
    var userInput = {
      title: $form.elements.title.value,
      photo: $form.elements.photo_url.value,
      notes: $form.elements.notes.value,
      entryID: data.nextEntryId }
    data.nextEntryId++;
    data.entries.unshift(userInput);
    imageElement.setAttribute('src', 'images/placeholder-image-square.jpg');
    viewEntries(event);
    $form.reset();
  }
}

function renderEntry(entry) {
  // setting up all relevant elements for the given journal entry.
  var finalProduct = document.createElement('li');
  var createdRow = document.createElement('div');
  var createdHalfColumnOne = document.createElement('div');
  var createdImage = document.createElement('img');
  var createdHalfColumnTwo = document.createElement('div');
  var createdHeading = document.createElement('h3');
  var createdParagraphElement = document.createElement('p');

  createdHeading.setAttribute('class', 'entry-heading');

  var headingThree = document.createTextNode(entry.title);
  var paragraph = document.createTextNode(entry.notes);
  var imageSourceFile = entry.photo;

  // set attributes for elements.
  // the order of our elements is - line item, div row, div column-half,
  // img, div.column-half, h3 (sibh), paragraph (sibs)

  var pencilIcon = document.createElement('i');
  pencilIcon.setAttribute('class', 'fa fa-pen');
  // line item needs no attribute.
  createdRow.setAttribute('class', 'row'); // div is set to row.
  createdHalfColumnOne.setAttribute('class', 'column-half'); // div is set to half column.
  createdImage.setAttribute('src', imageSourceFile); // img src is set w/ source image.

  createdHalfColumnTwo.setAttribute('class', 'column-half'); // div is set to half column. (second)
  // no need to set attributes to the header 3
  // no need to set attributes to the p element.

  createdRow.appendChild(createdHalfColumnOne); // attaching column to outermost row.
  createdHalfColumnOne.appendChild(createdImage);

  createdHeading.appendChild(headingThree); // text added to heading.
  createdParagraphElement.appendChild(paragraph); // text added to paragraph element.

  createdHalfColumnTwo.appendChild(createdHeading); // adding Paragraph to second half-column

  createdHalfColumnTwo.appendChild(pencilIcon);

  createdHalfColumnTwo.appendChild(createdParagraphElement); // adding Paragraph to second-half column.
  createdRow.appendChild(createdHalfColumnTwo);

  finalProduct.appendChild(createdRow);

  finalProduct.setAttribute('data-entry-id', entry.entryID); // Adding the entry ID to each product. Doing it on the top most element.
  return finalProduct;

}

function renderEntries(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = data.entries[i];
    var card = renderEntry(entry);
    $lineItem.appendChild(card);
  }
}

function handleViewChange(event) { // This function allows us to view the form where we see NEW entries.

  // no guard for the moment, not sure what I should block against since
  // the situation is digital in nature.

  for (let k = 0; k < $containerNodeList.length; k++) {
    var nodeItem = $containerNodeList[k];
    if (nodeItem === event.target) {
      nodeItem.setAttribute('class', 'container');
    } else {
      nodeItem.setAttribute('class', 'container hidden');
    }

    for (let i = 0; i < $containerNodeList.length; i++) {
      var containerListItem = $containerNodeList[i];
      if (containerListItem.getAttribute('data-view') === 'entry-form') {
        containerListItem.setAttribute('class', 'container');
      } else {
        containerListItem.setAttribute('class', 'container hidden');
      }
    }

  }
}

function viewEntries(event) { //  This function allows us to view the entries that are present with
  for (let i = 0; i < $containerNodeList.length; i++) {
    var nodeItem = $containerNodeList[i];
    if (nodeItem !== event.target) {
      nodeItem.setAttribute('class', 'container hidden');
    } else {
      nodeItem.setAttribute('class', 'container');
    }
  }

  for (let i = 0; i < $containerNodeList.length; i++) {
    var targetContainerListItem = $containerNodeList[i];
    if (targetContainerListItem.getAttribute('data-view') === 'entries') {
      targetContainerListItem.setAttribute('class', 'container');
    } else {
      targetContainerListItem.setAttribute('class', 'container hidden');
    }
  }

  renderEntries(); // we need to run this because when we revert back the view, I think it is pulling the old list - not the updated list with the new entry.
}

function editEntries(event) {
  var closestCompleteEntryCard = event.target.closest('li');
  entryId = closestCompleteEntryCard.getAttribute('data-entry-id');
  console.log(event.view.data.entries);
  if (event.target.tagName === 'I') {
    handleViewChange(event);
    data.editing = entryId;
    for (var i = 0; i < data.entries.length; i++) {
      var entryObject = data.entries[i];
      // console.log(entryObject)
      if (entryObject.entryID == entryId) {
        var titleEntry = entryObject.title;
        var photoEntry = entryObject.photo;
        var notesEntry = entryObject.notes;
        $titleField.value = titleEntry;
        $photoField.value = photoEntry;
        $notesField.value = notesEntry;
        handleImage(event);
      }
    }

    // end of function.
    // This function fires. It changes views. And then it
  }
}

$photoElement.addEventListener('change', handleImage);
$form.addEventListener('submit', handleForm);
window.addEventListener('DOMContentLoaded', renderEntries);
$button.addEventListener('click', handleViewChange);

$parentListener.addEventListener('click', editEntries);
