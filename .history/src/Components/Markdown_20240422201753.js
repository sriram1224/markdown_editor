import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [notes, setNotes] = useState([{ id: 1, content: '' }]);
  const [currentNoteId, setCurrentNoteId] = useState(1);
  const [markdownContent, setMarkdownContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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

  const handleNoteClick = (id) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
      setCurrentNoteId(id);
      setMarkdownContent(note.content);
      setShowEditor(true);
    }
  };

  const handleInsertImage = () => {
    setShowImageInput(true);
  };

  const handleImageInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleImageInsertConfirm = () => {
    if (imageUrl.trim() !== '') {
      const newContent = `${markdownContent}\n![Image](${imageUrl})`;
      setMarkdownContent(newContent);
      handleEditorChange(newContent);
    }
    setShowImageInput(false);
    setImageUrl('');
  };

  return (
    <div>
      <div style={{ float: 'left', width: '50%' }}>
        <h2>Notes</h2>
        <button onClick={handleNoteAdd}>+</button>
        <ul>
          {notes.map((note) => (
            <li key={note.id} onClick={() => handleNoteClick(note.id)}>
              Note {note.id}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ float: 'left', width: '50%' }}>
        <h2>Markdown Editor</h2>
        <div>
          <button onClick={() => setShowEditor(true)}>Write</button>
          <button onClick={() => setShowEditor(false)}>Preview</button>
          <button onClick={handleInsertImage}>Insert Image</button>
        </div>
        {showEditor ? (
          <>
            <textarea
              value={markdownContent}
              onChange={(e) => handleEditorChange(e.target.value)}
              style={{ width: '100%', height: '300px' }}
            />
            {showImageInput && (
              <div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={handleImageInputChange}
                  placeholder="Enter image URL"
                />
                <button onClick={handleImageInsertConfirm}>Insert</button>
              </div>
            )}
          </>
        ) : (
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
