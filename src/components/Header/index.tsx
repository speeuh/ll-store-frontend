import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import logoLL from "assets/logo.png";
import styles from "./Header.module.scss";

import stylesTema from "styles/Tema.module.scss";

export default function Header() {
  return (
    <>
      <Navbar bsPrefix={styles.menu} expand='lg'>
        <Navbar.Brand href='/'>
          <img src={logoLL} />
        </Navbar.Brand>
        <Navbar.Collapse className={styles.teste} >
          <Nav
            className={styles.menu}>
            <Form className={styles.menu__search}>
              <FormControl
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <Button className={styles.menu__search_button} variant='outline-success'> Search </Button>
            </Form>

            <Container className={styles.menu__items}>

              <Nav.Link className={styles.menu__items} href='/'> Home </Nav.Link>
              <Nav.Link className={styles.menu__items} href='/products'> All Products </Nav.Link>
              <Nav.Link className={styles.menu__items} href='/aboutus'> About Us </Nav.Link>
              <NavDropdown bsPrefix={styles.menu__items} title='Sections'>
                <NavDropdown.Item className={styles.menu__items} href='/groceries'> Groceries </NavDropdown.Item>
                <NavDropdown.Item className={styles.menu__items} href='/clothing'> Clothing </NavDropdown.Item>
                <NavDropdown.Item className={styles.menu__items} href='/electronics'> Electronics </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className={styles.menu__items} href='/daily'> Daily Basics </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className={styles.menu__items} href='/login'> Login/SignUp </Nav.Link>
            </Container>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className={stylesTema.container}>
        <Outlet />
      </div>
    </>
  );
}
