/* global data */
/* exported data */

var $photoElement = document.getElementById('photo_url');
var $form = document.getElementById('data-entry-form');

function handleImage(event) {
  var imageElement = document.querySelector('img');
  var imageUrl = 'images/placeholder-image-square.jpg';
  if ($photoElement.value !== null) {
    imageUrl = $photoElement.value;
    imageElement.setAttribute('src', imageUrl);
  } else {
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
  // data.entries.nextEntry++;
  $form.reset();
}

$photoElement.addEventListener('input', handleImage);
$form.addEventListener('submit', handleForm);
