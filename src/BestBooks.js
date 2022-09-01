import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal.js';
import BookUpdateModal from './BookUpdateModal.js';
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './BestBooks.css';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      books: [],
      show: false,
      showUpdate: false,
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  handleModal = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  handleUpdate = (book) => {
    this.setState({
      book: book,
      showUpdate: true,
    });
  }

  hideUpdate = () => {
    this.setState({
      showUpdate: false,
    });
  }

  handleAddBook = async (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked
    }

    try {
      let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook);
      let addedBook = response.data;
      this.setState({ books: [...this.state.books, addedBook] });
    } catch (error) {
      console.error(error);
    }
  }

  handleDeleteBooks = async (id) => {
    try {
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);
      let deletedBooks = this.state.books.filter(books => books._id !== id);
      this.setState({
        books: deletedBooks
      });
    } catch (error) {
      console.log('Houston, we have a problem: ', error.response.data);
    }
  }

  handleUpdateBooks = async (updatedBooks) => {
    try {
      let url = `${SERVER}/books/${updatedBooks._id}`;
      let updatedBooksfromDB = await axios.put(url, updatedBooks);
      let updatedBooksArr = this.state.books.map(existingBooks => {
        return existingBooks._id === updatedBooks._id

        ? updatedBooksfromDB.data
        : existingBooks
      });
      this.setState({
        books: updatedBooksArr,
        showUpdate: false,
      });

    } catch (err) {
      console.log('Houston, we have a problem: ', err.response.data);
    }
  }
  
  handleSubmitUpdate = (e) => {
    e.preventDefault();
    let bookToUpdate = {
      title: e.target.title.value || this.state.book.title,
      description: e.target.description.value || this.state.book.description,
      status: e.target.status.checked || this.state.book.status,
      _id: this.state.book._id,
      __v: this.state.book.__v,
    }
    console.log('bookToUpdate: ', bookToUpdate);
    this.handleUpdateBooks(bookToUpdate);
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data
      });
      console.log(this.state.books);
    } catch (error) {
      console.log('We have an error: ', error.response.data)
    }
  }

  postBooks = async (books) => {
    try {
      let url = `${SERVER}/books`;
      let newBook = await axios.post(url, books);
      this.setState({
        books: [...this.state.books, newBook.data],
      });
    } catch (e) {
      console.log('Houston, we got a problem', e.response)
    }
  }

  render() {
    let booksArr = this.state.books.map(book => {
      return <Carousel.Item key={book._id}>

        <img
          className="donQuijote"
          src={require('./Images/Don Quijote.png')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <p>{book.status}</p>

          <BookUpdateModal
            onShow={this.handleUpdate} />
          <Button onClick={this.handleUpdate}
            type='submit'
            variant='outline-info'>
            <FontAwesomeIcon icon={faEdit} />
          </Button>

          <Button onClick={() => {
            this.handleDeleteBooks(book._id)
          }}
            type='submit'
            variant='outline-danger'>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    });

    return (
      <div id='BestBooks'>

      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      <Carousel fade>
        {booksArr}
      </Carousel>
      <BookFormModal
      handleAddBook={this.handleAddBook}
      show={this.state.show}
      onHide={this.handleModal}
      />
      <BookUpdateModal
        show={this.state.showUpdate}
        handleSubmitUpdate={this.handleSubmitUpdate}
        onHide={this.hideUpdate}
        book={this.state.book}
        />
      <Button onClick={this.handleModal} variant='outline-primary'>
        <FontAwesomeIcon icon={faPlus} />
       </Button>
        <main>
          {
            this.state.books.length > 0 &&
            <>
              {booksArr}
            </>
          }
        </main>
      </div>
    )
  }
}

export default BestBooks;
