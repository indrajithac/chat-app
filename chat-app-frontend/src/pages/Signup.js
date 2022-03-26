import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useSignupUserMutation } from '../services/appApi'
import { LinkContainer } from 'react-router-bootstrap'
import './Signup.css'
import avatar from '../assests/signup-avatar.png'
import { useNavigate } from 'react-router-dom'


function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [image, setImage] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const [signupUser, { isLoading, error }] = useSignupUserMutation()

  const navigate=useNavigate()

  function validateImg(e) {
    const file = e.target.files[0]
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb")
    } else {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage() {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'ntdzpbmz')
    try {
      setUploadingImage(true)
      let res = await fetch('https://api.cloudinary.com/v1_1/daqptwhbt/image/upload', {
        method: 'post',
        body: data
      })
      const urlData = await res.json()
      setUploadingImage(false)
      return urlData.url
    } catch (error) {
      setUploadingImage(false)
      console.log(error);
    }

  }
  async function handleSignup(e) {
    e.preventDefault()
    if (!image) return alert('Please upload an avatar')
    const url = await uploadImage(image)
    console.log(url);
    signupUser({ name, email, password, url }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate('/chat')
      }
    })
  }



  return (
    <Container>
      <h1 className='d-flex align-items-center justify-content-center'>Sign up</h1>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form onSubmit={handleSignup}>
            <div className='signup-profile-pic_container'>
              <img src={imagePreview || avatar} alt="" className='signup-profile-pic' />
              <label htmlFor="image-upload" className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
              </label>
              <input type="file" id='image-upload' hidden accept='image/png, image/jpeg' onChange={validateImg} required />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              {uploadingImage ? 'Loading...' : 'Sign up'}
            </Button>
            <div className='py-4'>
              <LinkContainer to="/login">
                <p className='text-muted have-account'>
                  Have an account?
                </p>
              </LinkContainer>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup-bg"></Col>

      </Row>


    </Container>

  )
}

export default Signup