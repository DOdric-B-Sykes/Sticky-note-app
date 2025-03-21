import React from "react";

// Function purpose (why): Want to target and access the note itself, along with the content inside of the note -> will render the note and control the elements (content) inside it
const Note = (props) => {
  const updateTitle = (e) => {
    // "e" is used because we want to receive the "event" and use its data to fulfill the code inside the method/function
    const updatedValue = e.target.value; // <- is used to grab the value that the user enters or selects in the form element that triggered the event. It assigns this value to the variable `updatedValue` so that we can use it in our code for further processing or updating the UI.
    const editMeId = props.note.id; // Is targeting/access the id property of the note object passed to it via props
    props.onType(editMeId, "title", updatedValue); // <- code is calling a function `onType` that is passed as a prop to the component. It sends three arguments to the function: 1. `editMeId` - This is typically an identifier for the element being edited. 2. `"title"` - This is a string that represents the type of data being updated, in this case, it's updating the title. 3. `updatedValue` - This is the new value that the user has entered or selected in the form element. So essentially, this code is telling the parent component that the user has typed something new for the title of a specific element identified by `editMeId`.
  };

  const updateDescription = (e) => {
    // "e" is used because we want to receive the "event" and use its data to fulfill the code inside the method/function
    const updatedValue = e.target.value; // <- is used to grab the value that the user enters or selects in the form element that triggered the event. It assigns this value to the variable `updatedValue` so that we can use it in our code for further processing or updating the UI.
    const editMeId = props.note.id; // Is targeting/access the id property of the note object passed to it via props
    props.onType(editMeId, "description", updatedValue); // <- code is calling a function `onType` that is passed as a prop to the component. It sends three arguments to the function: 1. `editMeId` - This is typically an identifier for the element being edited. 2. `"title"` - This is a string that represents the type of data being updated, in this case, it's updating the title. 3. `updatedValue` - This is the new value that the user has entered or selected in the form element. So essentially, this code is telling the parent component that the user has typed something new for the title of a specific element identified by `editMeId`.
  };

  // The "updateTitle" and "updateDescription" functions will -> The updateTitle and updateDescription functions take the change made to the note (which you will get by interrogating the change event from the text input or textarea element) and assign it to the variable updatedValue. The id of the note is assigned to the variable editMeId.

  const deleteByNote = () => props.deleteNote(props.note); // Function (deleteNote) is using the data passed to it via props to execute the "deleteNote" function/method by accepting "note" as an arguement

  return (
    <li className="note">
      <input
        type="text"
        placeholder="Title"
        className="note__title"
        title={props.title} // Is used to access the title property of the App component (and subsquently the notes array)
        onChange={updateTitle} // Event listener/change event
      />
      <textarea
        placeholder="Description..."
        className="note__description"
        description={props.description} // Is used to access the description property of the App component (and subsquently the notes array)
        onChange={updateDescription} // Event listener/change event
      />
      <span className="note__delete" onClick={deleteByNote}>
        X
      </span>
    </li>

    // What the above code is doing (old code): The Note component will be rendered three times within the NotesList component. Start by defining a Note component and then copy one of the list items (with its contents) in the NotesList component and move it to the Note component. Be sure to export the Note component
    // Import the Note component into the NotesList component and replace the three list items with three Note JSX elements. The Note JSX elements will replace your static JSX sticky notes.
    // "title" prop is being passed down from the App component via use of (props) as the parameter for the Note method/function -> Is used to target/access the title property of the App component (object) via the notes variable
    // "description" prop is being passed down from the App component via use of (props) as the parameter for the Note method/function -> Is used to target/access the description property of the App component (object) via the notes variable
  );
};

export default Note;
