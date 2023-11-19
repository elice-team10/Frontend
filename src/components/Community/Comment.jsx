import { useState } from 'react';

function Comment({ comment }) {
  const [input, setInput] = useState('');

  return (
    <div>
      <div>
        <input
          type="text"
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="댓글을 남겨보세요."
        />
        <div onClick={onAddComment}>등록</div>
      </div>
    </div>
  );
}

export default Comment;
