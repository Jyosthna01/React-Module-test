import React, { useState } from 'react';
import './App.css';
function App() {
  const [groups, setGroups] = useState([
    { initials: 'MN', name: 'My Notes', color: '#007BFF' },
    { initials: 'MG', name: 'My personal grp', color: '#D1C4E9' },
    { initials: 'JG', name: 'Javascript grp', color: '#FFCDD2' },
    { initials: 'HG', name: 'HTML grp', color: '#80DEEA' },
    { initials: 'CN', name: 'CSS Notes', color: '#FFAB91' },
    { initials: 'SN', name: 'SQL Notes', color: '#7986CB' },
    { initials: 'PN', name: 'Python Notes', color: '#F48FB1' },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('#007BFF');

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setNotes(''); 
  };

  const handleInputChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSaveNote = () => {
    if (notes.trim()) {
      setSavedNotes([...savedNotes, { group: selectedGroup, text: notes, date: new Date() }]);
      setNotes(''); 
    }
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewGroupName('');
    setNewGroupColor('#007BFF');
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const initials = newGroupName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
      
      const newGroup = { initials, name: newGroupName, color: newGroupColor };
      setGroups([...groups, newGroup]);
      setSelectedGroup(newGroup);
      handleCloseModal();
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
          <h2>Pocket Notes</h2>
        <ul className="group-list">
          {groups.map((group, index) => (
            <li
              key={index}
              className={`group-item ${selectedGroup.name === group.name ? 'active' : ''}`}
              onClick={() => handleGroupClick(group)}
            >
              <span
                className="group-initials"
                style={{ backgroundColor: group.color }}
              >
                {group.initials}
              </span>
              <span className="group-name">{group.name}</span>
            </li>
          ))}
        </ul>
        <button className="add-button" onClick={handleAddButtonClick}>+</button>
      </div>

      <div className="content">
        <div className="content-wrapper">
          <div className="group-header" style={{ backgroundColor: selectedGroup.color }}>
            <span className="group-initials-header">{selectedGroup.initials}</span>
            <span className="group-name-header">{selectedGroup.name}</span>
          </div>

          {savedNotes
            .filter((note) => note.group.name === selectedGroup.name)
            .map((note, index) => (
              <div key={index} className="note">
                <p>{note.text}</p>
                <div className="note-date">
                  {note.date.toLocaleDateString()} • {note.date.toLocaleTimeString()}
                </div>
              </div>
            ))}

          <div className="note-input-wrapper">
            <textarea
              className="note-input"
              placeholder="Enter your text here..."
              value={notes}
              onChange={handleInputChange}
            ></textarea>
            <button
              className="send-button"
              onClick={handleSaveNote}
              disabled={!notes.trim()} 
            >
              <span role="img" aria-label="send">
                <img 
                  src={`${process.env.PUBLIC_URL}/Images/disabled.png`} 
                  alt="send" 
                  style={{ width: '24px', height: '24px' }} 
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding New Group */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Group</h3>
            <input
              type="text"
              placeholder="Enter group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <div className="color-picker">
              <label>Choose color:</label>
              <input
                type="color"
                value={newGroupColor}
                onChange={(e) => setNewGroupColor(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button className="create-button" onClick={handleCreateGroup}>
                Create
              </button>
              <button className="cancel-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default App;
