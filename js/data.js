/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousToDoJSON = localStorage.getItem('code-journal');

if (previousToDoJSON !== null) {
  data = JSON.parse(previousToDoJSON);
}

// event listener beforeUnload
window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  // stringify data
  var transformToJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', transformToJSON);
  // localStorage.setItem('thing', JSON data)
});
