import React , { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UploadForm extends Component {
  constructor() {
    super();
    this.state = { status: '' };
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    var formData = new FormData(ReactDOM.findDOMNode(self.refs.uploadForm));
    fetch('http://localhost:80/upload', {
        method: 'POST',
        body: formData
      })
      .then(function(response) {
        switch (response.status) {
          case 200:
            self.setState({status: "Файлы загружены успешно"});
            break;
          case 700:
            self.setState({status: "Файлы для загрузки не выбраны!"});
            break;
          default:
            self.setState({status: "Ошибка при загрузке файлов"});
        }
        return response.text();
      }).then(function(body) {
        console.log(body);
      });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit}
          ref='uploadForm'
          name='uploadForm'>
            <input type="file" name="fileChooser"  multiple/>
            <input type='submit' value='Upload!' />
        </form>
        <div>
          <br /><br />
          {this.state.status}
        </div>
      </div>
    )
  }
}
