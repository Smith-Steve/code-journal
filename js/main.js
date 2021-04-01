/* global data */
/* exported data */

var $photoElement = document.getElementById('photo_url');
var $form = document.getElementById('data-entry-form');
var imageElement = document.querySelector('img');
var imageUrl = 'images/placeholder-image-square.jpg';

var $lineItem = document.querySelector('ul');

function handleImage(event) {
  if ($photoElement.value !== null) {
    imageUrl = $photoElement.value;
    imageElement.setAttribute('src', imageUrl);
  }
}

function handleForm(event) {
  event.preventDefault();
  var userInput = {
    title: $form.elements.title.value,
    photo: $form.elements.photo_url.value,
    notes: $form.elements.notes.value,
    entryID: data.nextEntryId
  }; // put the form's input values into a new object. Add the nextEntryID to the object.
  data.nextEntryId++; // Increment the nextEntryId on the data model.
  data.entries.unshift(userInput); // The task list says, 'prepend' which means - to add to the front of.
  imageElement.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

function renderEntry(entry) {
  // setting up all relevant elements for the given journal entry.
  var finalProduct = document.createElement('li');
  var createdRow = document.createElement('div');
  var createdHalfColumnOne = document.createElement('div');
  var createdImage = document.createElement('img');
  var CreatedHalfColumnTwo = document.createElement('div');
  var createdHeading = document.createElement('h3');
  var createdParagraphElement = document.createElement('p');

  var headingThree = document.createTextNode(entry.title);
  var paragraph = document.createTextNode(entry.notes);
  var imageSourceFile = entry.photo;

  // set attributes for elements.
  // the order of our elements is - line item, div row, div column-half,
  // img, div.column-half, h3 (sibh), paragraph (sibs)

  // line item needs no attribute.
  createdRow.setAttribute('class', 'row'); // div is set to row.
  createdHalfColumnOne.setAttribute('class', 'column-half'); // div is set to half column.
  createdImage.setAttribute('src', imageSourceFile); // img src is set w/ source image.

  CreatedHalfColumnTwo.setAttribute('class', 'column-half'); // div is set to half column. (second)
  // no need to set attributes to the header 3
  // no need to set attributes to the p element.

  createdRow.appendChild(createdHalfColumnOne); // attaching column to outermost row.
  createdHalfColumnOne.appendChild(createdImage);

  createdHeading.appendChild(headingThree); // text added to heading.
  createdParagraphElement.appendChild(paragraph); // text added to paragraph element.

  CreatedHalfColumnTwo.appendChild(createdHeading); // adding Paragraph to second half-column
  CreatedHalfColumnTwo.appendChild(createdParagraphElement); // adding Paragraph to second-half column.

  createdRow.appendChild(CreatedHalfColumnTwo);

  finalProduct.appendChild(createdRow);

  return finalProduct;

}

function renderEntries() {
  for (var i = 0; i < data.entries; i++) {
    var card = renderEntry(data.entries[i]);

    $lineItem.appendChild(card);
  }
}

$photoElement.addEventListener('change', handleImage);
$form.addEventListener('submit', handleForm);
$lineItem.addEventListener('DOMContentLoaded', renderEntries);
