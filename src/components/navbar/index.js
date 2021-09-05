import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from 'reactstrap';

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">IDM</NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>

          <NavLink target="_blank" rel="noopener noreferrer" href="https://github.com/thulioph/idm/">
						GitHub
					</NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;