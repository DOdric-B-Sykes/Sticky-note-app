import React from "react";
import Note from "./Note.js";

// Function purpose: Controls and renders the list of notes (contained in the notes list array)
const NotesList = (props) => {
  const renderNote = (note) => (
    <Note
      onType={props.onType} // Function is passed to Note component via props and subsquently the Note.js
      key={note.id}
      note={note}
      deleteNote={props.deleteNote} // Function is passed to Note component via props and subsquently the Note.js
    />
  );

  // Function purpose (why): I want to sife through my notes array (list of notes) and only access/target ones satisfying my specific condition
  const keepSearchMatches = (note) => {
    return note.doesMatchSearch === true;
  };

  // Used (note) as parameter in callback function because I want to access each note object in the notes array individually and execute my code for each object individually -> Using the data from the Note component in the Note.js module
  // Can have another return statement in the code above since its nestled inside a separate function than the return statement further down (nestled inside the oveall NotesList function) -> using the "return" keyword allows me to use the value or results of my code outside of the scope in which it sits -> Needed to use "return" here because I want the keepSearchMatches function to result or return a specific value

  // Function purpose (why): Using the "keepSearchMatches" variable as an arguement/parameter, I want to filter through the notes array and filter out the notes in the notes array NOT meeting the condition stated in the "keepSearchMatches" variable (thus forming a new filtered notes array)
  const searchMatches = props.notes.filter(keepSearchMatches);

  // Using .filter() here allows the code to iterate over each note object in the notes array and filter out the ones whose doesMatchSearch value is false (in this one instance); creating a new array called searchMatches containing only note objects which contain doesMatchSearch property has a true value using "props.notes" to target the notes propety of the App component containing the initial array

  const noteElement = searchMatches.map(renderNote);

  {
    /* Function purpose (why): Because I now want to use my new filtered array (searchMatches, which contains the notes array data) as a starting point for rendering my sticky notes, I need to use the map method to iterate over each note object inside the notes array/searchMatches, rendering only the ones whose "doesMatchSearch" property contains a true value via way of the searchMatches variable  */
  }

  return (
    <ul className="notes-list">{noteElement}</ul>

    // What the above code is doing: replacing the three list items (*See "Note.js" module for old list item code) with three Note JSX elements. The Note JSX elements will replace your static JSX sticky notes.-> The Notes components are replaced by the "NoteElement" variable (To pass a note object from the notes array to each Note component you’ll map over props.notes. As you map over this array, call the renderNote function to render a Note component for each object in the notes array that was passed to the NotesList component. Assign the result of mapping over the array to the variable noteElements)
    // (*See the "Note.js" module for copy of unordered list old code) - Move all of the JSX for the unordered list to the NotesList component. Then export the component.
  );
};

export default NotesList;
