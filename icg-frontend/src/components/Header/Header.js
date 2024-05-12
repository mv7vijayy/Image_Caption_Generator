import React from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
//import { Button } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import Nav  from 'react-bootstrap/Nav'
import  Navbar  from 'react-bootstrap/Navbar'
import {NavLink} from 'react-router-dom'

import props from 'prop-types'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
function Header() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true)
  
    return (
    <div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Upload an image from your files using the Browse Button.<br></br>
          Click on Generate button to generate a caption.<br></br>
          You can access your past captions and images from History.(Requires Account)
        </Offcanvas.Body>
      </Offcanvas>
    <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
            <Navbar.Brand href='/' style={{"color" : "gold"}}>
                {/* <FontAwesomeIcon icon={faVideoSlash}/>Gold */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className ="nav-link" to="/">Home</NavLink>
                    {/* <NavLink className ="nav-link" to="/">History</NavLink>       */}
                </Nav>

                
                
                {/* <Button variant="outline-info" className="me-2">Login</Button>
                <Button variant="outline-info" className="me-2">Register</Button>

                <Button variant="outline-info" onClick={handleShow}>Help</Button> */}
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
  )
}

export default Header