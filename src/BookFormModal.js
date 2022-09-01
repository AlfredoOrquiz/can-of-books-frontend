import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './BestBooks.css';


class BookFormModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Form onSubmit={this.props.handleAddBook}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label >Add Title</Form.Label>
            <Form.Control type='text' name='title' placeholder='Enter a book name' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Add Description</Form.Label>
            <Form.Control type='text' name='description' placeholder='Enter the description' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='status'>
            <Form.Check type='checkbox' name='checkBox' label='Read' />
          </Form.Group>

          <Button onClick={this.props.onHide} variant='outline-primary' type='submit'>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default BookFormModal;
