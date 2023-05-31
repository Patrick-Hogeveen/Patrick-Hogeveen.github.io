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
//import '../bootstrap/dist/css/bootstrap.min.css';



const Navibar=() => {
    return(
        <div >
            
        <nav className="navbar  bg-dark justify-content-center fixed-top navbar-expand-lg navbar-dark" id="bar">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link active navbar-brand" href={"/#About"}>About</a>
          <a className="nav-link active navbar-brand" href={"/#Skills and Experience"}>Experience</a>
          <a className="nav-link active navbar-brand" href={"/#Work and Projects"}>Work and Projects</a>
          

        </div>
      </div>

    </nav>
    </div>
    );
}



export { Navibar};