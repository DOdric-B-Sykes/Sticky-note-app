import React from "react";

// Function purpose (why): Want to target the page header, "new note" button and search bar (along with the content going inside it)
const Header = (props) => {
  const updateSearch = (e) => {
    // "e" is used because we want to receive the "event" and use its data to fulfill the code inside the method/function
    const updatedSearch = e.target.value;
    // ^ is used to grab the value of the event triggered, that the user enters or selects in the form element that triggered the event. It assigns this value to the variable `updatedSearch` so that we can use it in our code for further processing or updating the UI.
    props.onSearch(updatedSearch); // Calls the onSearch event handler/function, passed to it via props from the Header component (located within the App component, using the "updatedSearch" variable as an argument/parameter
  };

  return (
    <header>
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          type="text"
          onChange={updateSearch} // onChange is the event listener and will active when the event is triggered (when text is entered into the search bar in this instance) -> when triggered, the event listener will call on the "updateSearch" event handler/function, subsquently calling the 'onSearch" function in the App component
          value={props.seachText} // This attribute will hold the value of searchText that was passed via props from the App component.
          placeholder="Type here to search..."
          className="search"
        />
      </aside>
    </header>

    // What the above code is doing: In the Header.js module, define a Header functional component that returns a piece of the JSX from the original, single App component you built in the last step.
    // What the above code is doing: Copy and paste the JSX for the header from the App component into the Header component. Then export the Header component.
    // Addressing "onClick" (the event listener) and "props.addNote" -> Use props to pass a reference to the addNote event handler method from App to the button element’s onClickevent listener
    // ^ Additional info regarding the onClick event listener: By using props to pass down the `addNote` method, you enable the child component to trigger the `addNote` method when a specific event (in this case, the click event on the button) occurs.
    // ^ Additional info regarding the onClick event listener: Here is a breakdown of how this works: 1. The `addNote` method is defined in the App component. 2. The `addNote` method is passed down to a child component as a prop. 3. In the child component, the `addNote` method is accessed through `props`. 4. When the button in the child component is clicked, the `addNote` method is invoked. This way, you establish communication between the parent and child components in React, allowing the child component to trigger actions defined in the parent component.
  );
};

export default Header;
