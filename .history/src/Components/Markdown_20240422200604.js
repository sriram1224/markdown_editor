import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [notes, setNotes] = useState([{ id: 1, content: '' }]);
  const [currentNoteId, setCurrentNoteId] = useState(1);
  const [markdownContent, setMarkdownContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const handleNoteAdd = () => {
    const newNoteId = currentNoteId + 1;
    setNotes([...notes, { id: newNoteId, content: '' }]);
    setCurrentNoteId(newNoteId);
    setMarkdownContent('');
    setShowEditor(true);
  };

  const handleNoteChange = (id, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
  };

  const handleEditorChange = (content) => {
    setMarkdownContent(content);
    handleNoteChange(currentNoteId, content);
  };

  return (
    <div>
      <div style={{ float: 'left', width: '50%' }}>
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <button onClick={() => setCurrentNoteId(note.id)}>Edit</button> Note {note.id}
            </li>
          ))}
        </ul>
        <button onClick={handleNoteAdd}>+</button>
      </div>
      <div style={{ float: 'left', width: '50%' }}>
        <h2>Markdown Editor</h2>
        <div>
          <button onClick={() => setShowEditor(true)}>Write</button>
          <button onClick={() => setShowEditor(false)}>Preview</button>
        </div>
        {showEditor ? (
          <textarea
            value={markdownContent}
            onChange={(e) => handleEditorChange(e.target.value)}
            style={{ width: '100%', height: '300px' }}
          />
        ) : (
          <div>
            <ReactMarkdown>{notes.find(note => note.id === currentNoteId).content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
