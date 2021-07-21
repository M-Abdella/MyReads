import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
  books: PropTypes.array.isRequired,
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.header}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
                <div key= {book.id}>
                  <Book
                    book = {book}
                    changeState ={this.props.changeState}
                  />
                </div>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf
