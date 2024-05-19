import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function TopHeader(props) {
  return (
    <Navbar expand="lg" style={{backgroundColor:'#b010d4'}} >
        <Container >
            <Navbar.Brand href="#" style={{color:'#fff', fontWeight:'bolder'}}>
              <i class="bi bi-book-fill "/> &nbsp;
              Kamus Bahasa Murop</Navbar.Brand>
        </Container>
    </Navbar>
  );
}