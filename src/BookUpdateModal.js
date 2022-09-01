import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

class BookUpdateModal extends React.Component {
  render() {
    return (
      <Modal
        show = {this.props.show}
        onHide = {this.props.onHide}>
        <Form onSubmit={this.props.handleSubmitUpdate}>
        <Form.Group className='mb-3' controlId='title'>
            <Form.Label >Title</Form.Label>
            <Form.Control type='text' name='title' placeholder='Enter a book name' />
          </Form.Group>
          
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' name='description' placeholder='Enter the description' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='status'>
            <Form.Check type='checkbox' name='status' label='Want to read'/>
          </Form.Group>

          <Button variant='outline-info' type='submit'>
            Update
          </Button>
        </Form>
      </Modal>
    )
  }
}


// <Form.Check type='checkbox' name='checkBox' label='Reading'/>
// <Form.Check type='checkbox' name='checkBox' label='Finished'/>

export default BookUpdateModal;