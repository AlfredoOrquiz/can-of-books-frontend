import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

class BookUpdateModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Form onSubmit={this.props.handleUpdateBooks}>
          <Form.Group className='mb-3' controlId='checkBox'>
            <Form.Check type='checkbox' name='checkBox' label='Read' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='checkBox'>
            <Form.Check type='checkbox' name='checkBox' label='Reading' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='checkBox'>
            <Form.Check type='checkbox' name='checkBox' label='Finished' />
          </Form.Group>

          <Button variant='outline-info' type='submit'>
            Update
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default BookUpdateModal;
