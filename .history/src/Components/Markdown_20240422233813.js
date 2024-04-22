import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faBold, faItalic, faLink, faCode, faImage, faList, faEdit, faTrashAlt, faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const MarkdownEditor = () => {
  const [notes, setNotes] = useState([{ id: 1, content: '' }]);
  const [currentNoteId, setCurrentNoteId] = useState(1);
  const [markdownContent, setMarkdownContent] = useState('');
  const [showEditor, setShowEditor] = useState(true);

  const textareaRef = useRef();

  const handleNoteAdd = () => {
    const newNoteId = (notes[notes.length - 1]?.id || 0) + 1;
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
    const note = notes.find(note => note.id === id);
    if (note) {
      setCurrentNoteId(id);
      setMarkdownContent(note.content);
      setShowEditor(true);
    }
  };

  const handleMarkdownFeatureClick = (feature) => {
    const markdownSnippet = {
      heading: '# heading\n',
      bold: '**bold text**\n',
      italic: '*italic text*\n',
      link: '[link text](http://example.com)\n',
      code: '`code`\n',
      image: '![alt text](image.jpg)\n',
      list: '- list item\n',
    }[feature];

    const cursorPosition = textareaRef.current.selectionStart;
    const newMarkdownContent = [
      markdownContent.slice(0, cursorPosition),
      markdownSnippet,
      markdownContent.slice(cursorPosition),
    ].join('');

    setMarkdownContent(newMarkdownContent);
    handleNoteChange(currentNoteId, newMarkdownContent);
  };

  const handleNoteDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (id === currentNoteId) {
      setCurrentNoteId(null);
      setMarkdownContent('');
      setShowEditor(false);
    }
  };

  return (
    <div className="container">
      <div className="notes-container">
              <div>
              <h2>Notes</h2>
       <button className="button" onClick={handleNoteAdd}>
  <FontAwesomeIcon icon={faPlus} />
</button>
        
              </div><ul>
          {notes.map((note) => (
            <li className=" " key={note.id} onClick={() => handleNoteClick(note.id)}>
              Note {note.id}
              
              <button className="button" onClick={() => handleNoteDelete(note.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
            </li>
          ))}
        </ul>
      </div>
      <div className="markdown-container">
        <h2>Markdown Editor</h2>
              <div>
                  <button className="button-one" onClick={() => setShowEditor(true)}><FontAwesomeIcon icon={faPencilAlt} /></button>
          <button className="button-one" onClick={() => setShowEditor(false)}><FontAwesomeIcon icon={faEye} /></button>
          <button className="button" onClick={() => handleMarkdownFeatureClick('heading')}><FontAwesomeIcon icon={faHeading} /></button>
          <button className="button" onClick={() => handleMarkdownFeatureClick('bold')}><FontAwesomeIcon icon={faBold} /></button>
          <button className="button" onClick={() => handleMarkdownFeatureClick('italic')}><FontAwesomeIcon icon={faItalic} /></button>
          <button className="button" onClick={() => handleMarkdownFeatureClick('link')}><FontAwesomeIcon icon={faLink} /></button>
          <button className="button" onClick={() => handleMarkdownFeatureClick('code')}><FontAwesomeIcon icon={faCode} /></button>
          <button className="button" onClick={() => handleMarkdownFeatureClick('image')}><FontAwesomeIcon icon={faImage} /></button>
          <button className="button" onClick={() => handleMarkdownFeatureClick('list')}><FontAwesomeIcon icon={faList} /></button>
        
          
        </div>
        {showEditor ? (
          <textarea
            ref={textareaRef}
            value={markdownContent}
            onChange={(e) => handleEditorChange(e.target.value)}
            className="textarea"
          />
        ) : (
          <ReactMarkdown className="markdown-content">{markdownContent}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
