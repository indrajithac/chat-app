import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import logo from '../assests/logo.png'
import { useSelector } from 'react-redux'
import { useLogoutUserMutation } from '../services/appApi'

function Navigation() {
    const [userLogout]=useLogoutUserMutation()

    async function handleLogout(e){
        e.preventDefault()
        await userLogout(user)

        window.location.replace('/')
    }
    const user = useSelector((state) => state.user)
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>
                        <img src={logo} width="50" height="50" />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to={'/login'}>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        {!user && (
                            <LinkContainer to={'/chat'}>
                                <Nav.Link>Chat</Nav.Link>
                            </LinkContainer>
                        )}
                        {user && (
                            <NavDropdown title={
                                <>
                                    <img src={user.url} style={{ width: 30, height: 30, marginRight: 10, objectFit: 'cover',borderRadius:'50%' }}></img>
                                    {user.name}
                                </>
                            } id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation