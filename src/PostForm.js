import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPostWithAPI, updatePostWithAPI } from "./actionCreators";
import './PostForm.css';


/** PostForm: Creates new post for blog */
const INITIAL_STATE = { title: "", description: "", body: "" };
function PostForm({ id, postDetails = INITIAL_STATE, setEditClicked }) {
  const [formData, setFormData] = useState(postDetails);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  /**handleSubmit: if editing post set editClicked state to false
   * and update post in database redirect to post
   * if adding add post to data base redirect to Blog
  */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (id) {
      let updateData = {
        title: formData.title,
        description: formData.description,
        body: formData.body
      }
      dispatch(updatePostWithAPI(updateData, id))
      setEditClicked(false)
    } else {
      dispatch(createPostWithAPI(formData))
      history.push("/");
    }
  }

  /**handleCancel: if editing set editClicked state to false
   * if adding redirect to Blog
   */
  function handleCancel() {
    if (id) {
      setEditClicked(false)
    } else {
      history.push('/');
    }
  }


  return (
    <div>
      <h1 className="PostForm-header">Write a post!</h1>
      <div className="PostForm-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-md-6">
            <label htmlFor="title"><b>Title</b></label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={formData.title}
              placeholder=""
              onChange={handleChange}>
            </input>
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="description"><b>Description</b></label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={formData.description}
              placeholder=""
              onChange={handleChange}>
            </input>
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="body"><b>Body</b></label>
            <input
              className="form-control"
              type="text"
              name="body"
              value={formData.body}
              placeholder=""
              onChange={handleChange}>
            </input>
          </div>
            <div className="form-group col-md-6">
              <button
                className="PostForm-btn btn btn-dark">
                <b>Save</b>
              </button>
            </div>
        </form>
        <div className="form-group col-md-6">
          <button
            className="PostForm-btn btn btn-light"
            onClick={handleCancel} >
            <b>Cancel</b>
          </button>
        </div>
      </div>
    </div>
  )
}


export default PostForm;