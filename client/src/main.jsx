import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import UploadForm from './components/upload-form.jsx';


class Main extends Component {
  render() {
    return (
      <div>
        <UploadForm />
      </div>
    )
  }
}

ReactDOM.render (
   <Main />,
   document.getElementById('main')
 );
