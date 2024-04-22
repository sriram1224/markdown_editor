import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faBold, faItalic, faLink, faCode, faImage, faList, faEdit, faTrashAlt, faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// ...

return (
  <div>
    <div style={{ float: 'left', width: '50%' }}>
      <h2>Notes</h2>
      <button onClick={handleNoteAdd}>+</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            Note {note.id}
            <button onClick={() => handleNoteClick(note.id)}><FontAwesomeIcon icon={faEdit} /></button>
            <button onClick={() => handleNoteDelete(note.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
          </li>
        ))}
      </ul>
    </div>
    <div style={{ float: 'left', width: '50%' }}>
      <h2>Markdown Editor</h2>
      <div>
        <button onClick={() => handleMarkdownFeatureClick('heading')}><FontAwesomeIcon icon={faHeading} /></button>
        <button onClick={() => handleMarkdownFeatureClick('bold')}><FontAwesomeIcon icon={faBold} /></button>
        <button onClick={() => handleMarkdownFeatureClick('italic')}><FontAwesomeIcon icon={faItalic} /></button>
        <button onClick={() => handleMarkdownFeatureClick('link')}><FontAwesomeIcon icon={faLink} /></button>
        <button onClick={() => handleMarkdownFeatureClick('code')}><FontAwesomeIcon icon={faCode} /></button>
        <button onClick={() => handleMarkdownFeatureClick('image')}><FontAwesomeIcon icon={faImage} /></button>
        <button onClick={() => handleMarkdownFeatureClick('list')}><FontAwesomeIcon icon={faList} /></button>
      </div>
      <div>
        <button onClick={() => setShowEditor(true)}><FontAwesomeIcon icon={faPencilAlt} /></button>
        <button onClick={() => setShowEditor(false)}><FontAwesomeIcon icon={faEye} /></button>
      </div>
      {showEditor ? (
        <textarea
          ref={textareaRef}
          value={markdownContent}
          onChange={(e) => handleEditorChange(e.target.value)}
          style={{ width: '100%', height: '300px' }}
        />
      ) : (
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      )}
    </div>
  </div>
);