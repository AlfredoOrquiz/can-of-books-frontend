import React from 'react';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let results = await axios.get(`${REACT_APP_SERVER}/books`);
      this.setState({
        books: results.data
      });
    } catch(error){
      console.log('We have an error: ', error.response.data)
    }
  }

  componentDidMount() {
    this.getBooks();
  }  

  render() {

    /* TODO: render all the books in a Carousel */
    let booksArr = this.state.books.map(books => (
      <p key={books._id}>{books.title}</p>
    ));

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

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
          <h3>No Books Found :</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
