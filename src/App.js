import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import NotesList from "./components/noteslist";
import Search from './components/searchbar';
import Header from './components/Header';

const App = () => {
    const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "15/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "15/05/2021",
    },
    {
      id: nanoid(),
      text: "This is my new note!",
      date: "15/06/2021",
    },
    {
      id: nanoid(),
      text: "This is my fourth note!",
      date: "15/07/2021",
    },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=> {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if(savedNotes){
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data', 
      JSON.stringify(notes)
    );
  }, [notes]);

  const AddNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText}/>
        <NotesList 
          notes={notes.filter((note)=> 
            note.text.toLowerCase().includes(searchText)
          )} 
          handleAddNote={AddNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
    );
  };

export default App;
