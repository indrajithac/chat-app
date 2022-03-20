import React from 'react'
import './Home.css'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Home() {
  return <Row>
    <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
      <div>
        <h1>Welcome to Chat-App</h1>
        <p>Chat with your friends</p>
        <LinkContainer to={"/chat"}>
          <Button variant='success'>Get Started 
            <i className='fas fa-comments home-message-icon'></i>
          </Button>
        </LinkContainer>
      </div>
    </Col>
    <Col md={6} className="home-bg">
    </Col>
  </Row>
}

export default Home