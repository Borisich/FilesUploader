import React , { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UploadForm extends Component {
  constructor() {
    super();
    this.state = { user: {} };
    this.onSubmit = this.handleSubmit.bind(this);
    //this.formData = this.refs.uploadForm.getDOMNode();
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    //var formData = self.refs.uploadForm.getDOMNode();
    //var formData = ReactDOM.findDOMNode(self.refs.uploadForm);
    var formData = new FormData(ReactDOM.findDOMNode(self.refs.uploadForm));
    //console.log(formData);
    fetch('http://localhost:80/upload', {
        method: 'POST',
        //mode: 'no-cors',
        /*body: {
          file: self.refs.sampleFile
        }*/
        body: formData
      })
      .then(function(response) {
        //console.log(response);
        return response.text();
        //console.log(response.json());
      }).then(function(body) {
        console.log(body);
      });
  }

  render() {
    return (
      <div className="wrapper">
        <form
          onSubmit={this.onSubmit}
          ref='uploadForm'
          id='uploadForm'
          name='uploadForm'
          action='http://localhost:80/upload'
          method='post'
          encType="multipart/form-data">
            <input type="file" name="sampleFile" ref="sampleFile" multiple/>
            <input type='submit' value='Upload!' />
        </form>
      </div>
    )
  }
}
