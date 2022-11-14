//Navbar
import React from 'react';
//import { Button, Navbar, NavDropdown, Nav, Container, navbarClasses } from 'react-bootstrap'
import './navbar.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
//import '../bootstrap/dist/css/bootstrap.min.css';



const Navibar=() => {
    return(
        <div >
            <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossOrigin="anonymous"
    />
        <nav className="nav justify-content-center fixed-top navbar-expand-lg navbar-light" id="bar">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link active navbar-brand" href={"/#About"}>About</a>
          <a className="nav-link active navbar-brand" href={"/#Experience"}>Experience</a>
          <a className="nav-link active navbar-brand" href={"/#Work and Projects"}>Work and Projects</a>
          

        </div>
      </div>
      
      
      
    </nav>
    </div>
    );
}



export { Navibar};