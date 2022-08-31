import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

class BookFormModal extends React.Component {
  render() {
    return (
      <Modal show = {this.props.show} onHide = {this.props.onHide}>
        <Form onSubmit={this.props.handleAddBook}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label >title</Form.Label>
            <Form.Control type='text' name='title' placeholder='Enter a book name' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>description</Form.Label>
            <Form.Control type='text' name='description' placeholder='Enter the description' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='checkBox'>
            <Form.Check type='checkbox' name='checkBox' label='Have you read the book?' />
          </Form.Group>
          <Button onClick={this.props.onHide} variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default BookFormModal;