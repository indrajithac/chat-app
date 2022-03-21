import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import './MessageForm.css'

function MessageForm() {
    function handleSubmit(e) {
        e.preventDefault()
    }
    return (
        <>
            <div className='messages-output'></div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control type="text" placeholder='Your message'></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button variant='primary' type='submit'>
                            <i className='fas fa-paper-plane' />
                        </Button>
                    </Col>

                </Row>
            </Form>
        </>

    )
}

export default MessageForm