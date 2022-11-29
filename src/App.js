import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import NotesList from "./components/noteslist";
import Search from './components/searchbar';
import Header from './components/Header';

const App = () => {
    const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "Go Christmas Shopping",
      date: "12/04/2022",
    },
    {
      id: nanoid(),
      text: "Make Holiday Cookies",
      date: "12/05/2022",
    },
    {
      id: nanoid(),
      text: "Watch Holiday movies!",
      date: "12/06/2022",
    },
    {
      id: nanoid(),
      text: "Spend time with Friends and Family!",
      date: "12/07/2022",
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
