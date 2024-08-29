import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './NoteTakingArea.css';

function NoteTakingArea() {
  const { groupName } = useParams();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        text: newNote,
        date: new Date().toLocaleString(),
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  return (
    <div className="note-taking-area">
      <div className="note-group-header">
        <div className="group-initials">
          {groupName.split(' ').map(word => word[0]).join('').toUpperCase()}
        </div>
        <div className="group-name">{groupName}</div>
      </div>

      <div className="notes-display">
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <p>{note.text}</p>
            <span>{note.date}</span>
          </div>
        ))}
      </div>

      <div className="note-input-area">
        <textarea
          placeholder="Enter your text here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        ></textarea>
        <button
          onClick={handleAddNote}
          disabled={!newNote.trim()}
          className="send-btn"
        >
          <img src="/images/send-icon.png" alt="Send" />
        </button>
      </div>
    </div>
  );
}

export default NoteTakingArea;
