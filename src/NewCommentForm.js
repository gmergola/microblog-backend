

import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createCommentWithAPI } from "./actionCreators";
import './NewCommentForm.css';

/* NewCommentForm: Allows creation of new comments */
function NewCommentForm({ postId }) {
  const inital_comment_state = '';
  const [formData, setFormData] = useState(inital_comment_state);
  const dispatch = useDispatch();

  function handleChange(evt) {
    setFormData(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(createCommentWithAPI({ text: formData }, postId))
    setFormData(inital_comment_state);

  }

  return (
    <div className="NewCommentForm-div form-group">
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentText">
          <input
            className="form-control"
            type="text"
            name="commentText"
            value={formData}
            placeholder="New Comment"
            onChange={handleChange}
          />
        </label>
          <button className="NewCommentForm-btn btn btn-info">Add</button>
      </form>
    </div>
  )
}

export default NewCommentForm;