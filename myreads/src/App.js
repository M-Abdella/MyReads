import React from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResults: [],
      books: [],
      currentRead:[],
      wantToRead:[],
      read:[],
      loaded: false,
    }
    this.changeState = this.changeState.bind(this)
  }
//  fetch books data from server to start
  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.updateState(books);
      })
  }
// update app state to classify books depends on book states
  updateState(books){
    this.setState(() => ({
      books: books,
      currentRead: books.filter(book => book.shelf === 'currentlyReading'),
      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
      read: books.filter(book => book.shelf === 'read'),
      loaded:true
    }))
  }
//change book state deepend on user choice
  changeState(book, newState) {
    BooksAPI.update(book, newState)
    let books = this.state.books;
    books[books.indexOf(book)].shelf = newState;
    this.updateState(books);
  }
// update search deepend on user input
  updateQuery(query){
    let books = this.state.books;
    let list = query.split(' ').filter((word) => (word!==''));
    books = books.filter((book) => {
      for(let word in list) {
        if (book.title.toLowerCase().includes(list[word].toLowerCase())) {
          return true;
        }
        for(let author in book.authors) {
          if (book.authors[author].toLowerCase().includes(list[word].toLowerCase())) {
            return true;
          }}
      }return false;
    })
    this.setState(() => ({
      queryResults: books
    }))
  }

  render() {
//wait untill data fetched
    if (!this.state.loaded) {
    return <div />
  }
    return (
      <div className="app">
      <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
            <Link
              to='/'>
              <button className="close-search" onClick={() => this.setState({queryResults: []})}>Close</button>
            </Link>
              <div className="search-books-input-wrapper">
                <input type="text"
                  placeholder="Search by title or author"
                  onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <BookShelf
                header = {this.state.queryResults.length === 0 ? 'No result to show' : 'Search results'}
                books = {this.state.queryResults}
                changeState = {this.changeState}
              />
            </div>
          </div>
      )} />
      <Route exact path='/'  render={() => (
          <div className="list-books" >
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                    header = 'Currently Reading'
                    books ={this.state.currentRead}
                    changeState = {this.changeState}
                  />
                  <BookShelf
                    header = 'Want to Read'
                    books ={this.state.wantToRead}
                    changeState = {this.changeState}
                  />
                  <BookShelf
                    header = 'Read'
                    books ={this.state.read}
                    changeState = {this.changeState}
                  />
              )}
            </div>
            <div className="open-search">
              <Link
                to='/search'>
                <button onClick={() => this.setState({queryResults: []})}>Add a book</button>
              </Link>
            </div>
          </div>
      )} />
      </div>
    )
  }
}

export default BooksApp
