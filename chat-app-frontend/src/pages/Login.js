import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e){
    e.preventDefault()
  }
  return (
    <Container>
      <h1 className='d-flex align-items-center justify-content-center'>Login in</h1>
      <Row>
        <Col md={5} className="login-bg">
        </Col>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form onSubmit={handleLogin}> 
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div className='py-4'>
              <LinkContainer to="/signup">
                <p className='text-muted have-account'>
                  Create an account
                </p>
              </LinkContainer>
            </div>
          </Form>
        </Col>

      </Row>


    </Container>
  )
}

export default Login