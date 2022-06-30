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
import { useContext } from "react";
import { AuthContext } from "contexts/auth";

export default function Header() {

  const { authenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar bsPrefix={styles.menu} expand='lg'>
        <Navbar.Brand href='/'>
          <img src={logoLL} />
        </Navbar.Brand>
        <Navbar.Collapse className={styles.navbar} >
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
              <Nav.Link href='/'> Home </Nav.Link>
              <Nav.Link href='/products'> All Products </Nav.Link>
              <Nav.Link href='/aboutus'> About Us </Nav.Link>
              <NavDropdown title='Sections'>
                <Nav.Link href='/groceries'> Groceries </Nav.Link>
                <Nav.Link href='/clothing'> Clothing </Nav.Link>
                <Nav.Link href='/electronics'> Electronics </Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link href='/daily'> Daily Basics </Nav.Link>
              </NavDropdown>
              <NavDropdown title='Account'>
                {authenticated === true ? (
                  <>
                    <Nav.Link href='/admin/products'> Create Product </Nav.Link>
                    <Button bsPrefix={styles.menu__items_button} onClick={handleLogout}> Logout </Button>
                  </> 
                )
                : <Nav.Link href='/login'> Login/SignUp </Nav.Link>}
              </NavDropdown>
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
