import React, { Component } from 'react';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.book.shelf};
    this.handleChange = this.handleChange.bind(this);
 }

  handleChange(event){
    this.setState({value: event.target.value});
    this.props.changeState(this.props.book, event.target.value);
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.smallThumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors.map((author, index)=>(<div key = {index+1}>{author}</div>))}</div>
        </div>
      </li>
    );
  }
}
export default Book
