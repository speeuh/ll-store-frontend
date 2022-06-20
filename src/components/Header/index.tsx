import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import logoLL from "assets/logo.png";
import styles from "./Header.module.scss";

import stylesTema from "styles/Tema.module.scss";

export default function Header() {
  return (
    <>
      <Navbar  bsPrefix={styles.menu} expand='lg'>
        <div>
        <Navbar.Brand href='#'>
          <img src={logoLL} />
        </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse className={styles.teste} >
          <Nav
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
              <Form  className={styles.menu__search}>
                <FormControl
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <Button variant='outline-success'>Search</Button>
              </Form>
            <div  className={styles.menu__items}>
            <Nav.Link href='#action1'>Home</Nav.Link>
            <Nav.Link href='#action2'>All Products</Nav.Link>
            <Nav.Link href='#'> About Us </Nav.Link>
            <NavDropdown title='Sections' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='#action3'>Groceries</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>Clothing</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>Electronics</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>Daily Basics</NavDropdown.Item>
            </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className={stylesTema.container}>
        <Outlet />
      </div>
    </>
  );
}
