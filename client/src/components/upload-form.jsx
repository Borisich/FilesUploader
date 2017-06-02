import React , { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UploadForm extends Component {
  render() {
    return (
      <div className="wrapper">
        <form ref='uploadForm'
          id='uploadForm' 
          action='http://localhost:80/upload'
          method='post'
          encType="multipart/form-data">
            <input type="file" name="sampleFile" />
            <input type='submit' value='Upload!' />
        </form>
      </div>
    )
  }
}
