//Navbar
import React from 'react';
//import { Button, Navbar, NavDropdown, Nav, Container, navbarClasses } from 'react-bootstrap'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';



const Navibar=() => {
    return(
      <div >
            
        <nav className="navbar navbar-toggleable-md bg-dark justify-content-center fixed-top navbar-expand-lg navbar-dark" id="bar">
          <button id="nav-btn" class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <a className="nav-link navLink" href={"/#About"}>About</a>
            <a className="nav-link active navbar-brand" href={"/#Skills and Experience"}>Experience</a>
            <a className="nav-link active navbar-brand" href={"/#Work and Projects"}>Work and Projects</a>
          

          </div>
          </div>

        </nav>
    </div>
    );
}

const NavBar2=() => {
  return (
    <>
      <Navbar collapseOnSelect expand="sm"  variant='dark'>
        <Navbar.Toggle aria-controls='navbarScroll' data-bs-target="#navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <a className="nav-link navLink navbar-brand" href={"/#About"}>About</a>
            <a className="nav-link active navbar-brand" href={"/#Skills and Experience"}>Experience</a>
            <a className="nav-link active navbar-brand" href={"/#Work and Projects"}>Work and Projects</a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}



export { Navibar, NavBar2};