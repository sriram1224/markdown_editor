import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [notes, setNotes] = useState([{ id: 1, content: '' }]);
  const [currentNoteId, setCurrentNoteId] = useState(1);

  const handleNoteAdd = () => {
    const newNoteId = currentNoteId + 1;
    setNotes([...notes, { id: newNoteId, content: '' }]);
    setCurrentNoteId(newNoteId);
  };

  const handleNoteChange = (id, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
  };

  const handleEditorChange = (id, content) => {
    handleNoteChange(id, content);
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <textarea
            key={note.id}
            value={note.content}
            onChange={(e) => handleNoteChange(note.id, e.target.value)}
          />
        ))}
        <button onClick={handleNoteAdd}>+</button>
      </div>
      <div>
        <h2>Markdown Editor</h2>
        {notes.map((note) => (
          <div key={note.id}>
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkdownEditor;
