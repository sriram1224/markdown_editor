import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const handleNoteAdd = () => {
    if (currentNote.trim() !== '') {
      setNotes([...notes, currentNote]);
      setCurrentNote('');
    }
  };

  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const handleEditorChange = (e) => {
    setMarkdownContent(e.target.value);
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        <textarea value={currentNote} onChange={handleNoteChange} />
        <button onClick={handleNoteAdd}>+</button>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Markdown Editor</h2>
        <div>
          <button onClick={() => setShowEditor(true)}>Write</button>
          <button onClick={() => setShowEditor(false)}>Preview</button>
        </div>
        {showEditor ? (
          <textarea value={markdownContent} onChange={handleEditorChange} />
        ) : (
          <div>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
