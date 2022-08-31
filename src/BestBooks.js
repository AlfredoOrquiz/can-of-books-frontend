import React from 'react';
import axios from 'axios';
import Button  from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal.js';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
    }
  }

  handleModal =() => {
    this.setState({
      show: !this.state.show,
    });
  }

  handleAddBook = async(e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.checkBox.checked ? 'available' : 'unavailable'
    }

    try {
      let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, newBook);
      let addedBook = response.data;
      this.setState({books:[...this.state.books, addedBook]});
    } catch (error) {
      console.error(error);
    }
  }

  handleDeleteBooks = async (id) => {
    try {
      let url = `${SERVER}/books/${id}`;
      await axios.delete(id);
      // this.getBooks();
      let updatedBooks =this.state.books.filter(books => books._id !== id);
      this.setState({
        books: updatedBooks
      });
    } catch (error) {
      console.log('Huston, we have another problem: ', error.response.data);
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data
      });
      console.log(this.state.books);
    } catch(error){
      console.log('We have an error: ', error.response.data)
    }
  }
  
  componentDidMount() {
    this.getBooks();
  }

  postBooks = async (books) => {
    try {
      let url = `${SERVER}/books`;
      let newBook = await axios.post(url, books);
      this.setState({
        books: [...this.state.books, newBook.data],
      });
    } catch (e){
      console.log('Huston, we got a problem',e.response)
    }
  }

  render() {

    /* TODO: render all the books in a Carousel */
    let booksArr = this.state.books.map(book => {
      return <Carousel.Item key={book._id}>
          <img
            className="Don Quijote"
            src={require('./Images/Don Quijote.png')}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>{book.status}</p>
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
      show={this.state.show}
      onHide={this.handleModal}
      handleAddBook={this.handleAddBook}
      />
      <Button onClick={this.handleModal} variant='outline-primary'>Add book</Button>{' '}

        <main>
          {
            this.state.books.length > 0  &&
            <>
            {booksArr}
            </>
          }
        </main>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>Book colection is empty.</h3>
        )}
      </div>
    )
  }
}

export default BestBooks;