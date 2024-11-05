import React, { useState } from 'react';
import './PostModal.css';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (title: string, description: string, thread: string) => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onPost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thread, setThread] = useState('');

  const handleSubmit = () => {
    if (title.trim() && description.trim() && thread.trim()) {
      onPost(title, description, thread);
      setTitle('');
      setDescription('');
      setThread('');
      onClose(); // Close modal after posting
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create a New Post</h2>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter post description"
          />
        </div>
        <div>
          <label>Your Thread</label>
          <textarea
            value={thread}
            onChange={(e) => setThread(e.target.value)}
            placeholder="Enter thread content"
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Post</button>
          <button onClick={onClose}>Cancel</button>
        </div>  
      </div>
    </div>
  );
};

export default PostModal;
