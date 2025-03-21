import React from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";
import { Component } from "react";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      },
    ],

    searchText: "",
  };

  // ^ Now considered as "updatedNotes" - update state for the App component replacing the current (old) data (notes array in this instance) with placeholder data (located in the addNote event handler/method aka function). Instead of three objects, you only need one object held in state - Replaced the original array of note objects with the placeholder data created in the "addNote" method/function

  // Function purpose: Will add a new note object to the notes array (the code for that is under this one)
  // This is an event handler
  // Why use "id: Date.now()" -> The purpose of writing the id property as id: Date.now() is to generate a unique identifier for each note object. By using Date.now(), which returns the current timestamp in milliseconds, we ensure that each note will have a different id value. This unique id is important for identifying and updating specific note objects when needed.
  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };

    const newNotes = [newNote, ...this.state.notes]; // Use [] when using spread syntax for an array insteasd of ({}) -> Since I want my new note to render at the top of my array, I put the "newNote" variable (storing my new note data) in front of the current array (identifed by "...this.state.notes")
    this.setState({ notes: newNotes }); // <- Need to put the name of the variable hodling the state (notes in this instance), followed by the variable contianing the new constructed array (by updating the state) -> State will update/trigger code when an event takes place (like clicking the button since its the event listener (onClick))
  };

  // Below function is handling mapping over and iterate over each note in the notes array, using the data passed down to it via the "note" parameter
  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId -> acts as a placeholder to store the id data of the note that is edited
    // updateKey -> placeholder to hold the data located in the title or description field
    // updateValue -> placeholder to hold the value of the title or description field
    // The onType method/function will receive the 3 values as parameters/arguements

    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        // The code to the above is saying "if the id property of the note object DOES NOT equal the ty[e/value of the editMeId variable/parameter/placeholder" then execute the code below it
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });

    // ^ Function purpose: What the above function is doing after it maps (.map()) over the note property -> If it isn’t the updated note, the note is returned and isn’t affected by the update. If it is the edited note’s id, the function checks to see if the updatedKey is "title". If so, the note’s title is updated and the note is returned. Otherwise, the note’s description is updated and the note is returned.

    this.setState({ notes: updatedNotes }); // <- Is updating the state whenever code is triggered/event is triggered via the event handler and listener
  };

  // The return keyword allows me to return the value and execution of a function, that can be used else where in the capacity

  // Using (note => {}) means -> it allows you to iterate over each element in an array and perform a specific action on each element. The arrow function `(note => {})` is a concise way to define a function that takes an argument `note`, which represents each element in the array as the map method loops through it. This allows you to access and manipulate each element individually within the function body

  // Function will render certain notes that match the text entered into search bar
  // Used "searchText" as the parameter/argument here because I want to pass the searchTextv data from the state to this function so it has the necessary data to influence the code within the function
  onSearch = (searchText) => {
    const submittedText = searchText.toLowerCase(); // Used "to.LowerCase()" here because I want to turn my searchText data into lower case so can be compared correctly when searching for the corresponding note

    const searchNotes = this.state.notes.map((note) => {
      // I want to map through each note in the notes array (state) -> Why I used "note" as the argument of the map function: You used "note" as the argument for the map function because it represents each individual item in the array of notes that you are mapping over. It helps you access the properties and values of each note within the array during the mapping process.
      if (!submittedText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase().includes(submittedText);
        const description = note.description
          .toLowerCase()
          .includes(submittedText); // The value for both the "title" and "description" variables: The title property of the each note object is accessed, transformed into lowercase and then used to compared to the "submittedText" variable to see if it matches
        const titleMatch = title;
        const descripMatch = description;
        const hasMatch = titleMatch || descripMatch; // Used an OR operator here, an OR operator -> You can use the OR operator to replace short if / else statements, given that it will evaluate to “true” if one or both conditions are true
        note.doesMatchSearch = hasMatch; // The value for the note returned (rendered) is now changed to the value for "hasMatch", which means that "doesMatchSearch" property of the note object is now matching texted entered into the search bar (via the submittedText variable)
        return note;
      }

      // ^ The above conditional statment translates to:
      // The IF statement is saying: IF the "submittedText" variable has NO value (meaning there is nothing written in the searchText aka search bar), then return all the note objects within the notes array which their "doesMatchSearch" property is true.
      // The ELSE statement is saying: if there is a value to the "submittedText" variable (meaning that ther is somehting written within the searchText aka search bar), then the following code underneath the else statement goes into effect.
    });

    this.setState({ notes: searchNotes, searchText: submittedText }); // This code is saying: The new value of state is the "searchNotes" array, while the new value for searchText is the value of the "submittedText" variable
  };

  // Function will handle the delete functionality of the UI (will focus on deleting notes)
  deleteNote = (clickedNote) => {
    const filterToRemove = (note) => note !== clickedNote; // Function purpose: The purpose of this function is to filter out a specific `note` (represented by `clickedNote`) from an array. This function compares each element in the array with the `clickedNote`. If the element is not equal to the `clickedNote`, it returns `true` and keeps the element in the filtered array. If the element is equal to the `clickedNote`, it returns `false` and filters out that element from the array.
    const removeNote = this.state.notes.filter(filterToRemove); // Function is filtering the notes array and applying the "filterToRemove" code

    this.setState({ notes: removeNote }); // This is updating the state aka notes array
  };

  updateNote = (e) => this.setState({ notes: e.target.value });
  componentDidMount() {
    const getNote = localStorage.getItem("getNote");
    if (getNote) {
      const savedNote = JSON.parse(getNote); // Using "JSON.parse()" turns the data model (state) back into an array from a string
      this.setState(savedNote);
    }
  }

  componentDidUpdate() {
    const getNote = JSON.stringify(this.state); // Using "JSON.stringify()" turns the data model (state) in a string so it can be saved
    localStorage.setItem("getNote", getNote);
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch} // onSearch is passed to the Header component via props (onSearch=), with it calling the "onSearch" event handler/function -> (see Header.js for other side of code)
          searchText={this.state.searchText}
          addNote={this.addNote}
        />
        <NotesList
          onType={this.onType}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          onChange={this.updateNote} // Event listener -> event will trigger when state is saved to browser or console
        />
      </div>
      // What the above code is doing: Pass searchText to the Header component and Pass notes to the NotesList component
      // pass the "searchText" and "notes" props the "this.state.name of props" to pass down data to the necessary elements in the NotesList.js and Header.js / Use the "this" keyword as a way of accessing the state property of the App object & using "this.state" inside of the render method of a class allows me to access and ultilize the revelant component's state data to dynamicically render and pass down info/data to other components
      // Pass the addNote method/function (event handler) to the Header component as props (props.addNote) located in the onClick event listener in the button JSX element of the Header.js
      // Pass the onType method/function (event handler) to the NotesList component and then to the Notes component since the Note.js is the child component of NotesList.js
      // Pass the deleteNote method/function (event handler) to the NotesList component and then to the Notes component since the Note.js is the child component of NotesList.js
    );
  }
}

// What the "notes" array is doing above: The purpose of adding the `notes` property with an array of objects inside the `state` of your `App` component is to store the data for each note within the component's state. By storing the note data in the component's state, you can easily manage and update the notes within your application. This allows you to dynamically render the list of notes, update individual notes, or add new notes based on user interactions or application logic. Overall, including the `notes` property in the component's state sets up the initial data structure for managing notes within your application, providing a foundation for building out note-related functionality.

export default App;
