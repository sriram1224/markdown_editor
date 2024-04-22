import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [markdownContent, setMarkdownContent] = React.useState('');

  const handleInputChange = (e) => {
    setMarkdownContent(e.target.value);
  };

  return (
    <div>
      <textarea value={markdownContent} onChange={handleInputChange} />
      <div>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
