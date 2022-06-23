import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Container, Carousel, Row } from "react-bootstrap";
import styles from "./Home.module.scss";
import gatosfofos from "assets/gatosfofos1.jpg";
import gatosfofos2 from "assets/gatosfofos2.jpg";
import gatosfofos3 from "assets/gatosfofos3.jpg";
import groceries from "assets/groceries1.jpg";
import clothing from "assets/clothing.png";
import ihpones from "assets/ihpones.jpg";
import teste from "assets/Novidades.gif";


export default function Home() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => console.log(response));
  }, []);
                    
  return (
    
    
    <Container >
     <Row className={styles.carousel}>
      <Carousel>
        <Carousel.Item>
          <img src={teste} alt="" />
        </Carousel.Item>
        <Carousel.Item>

          <Carousel.Caption className={styles.carousel__footprints}>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>  

          <Carousel.Caption className={styles.carousel__footprints}>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> 
      </Row>
      <Row className={styles.container}>
      <Card style={{ width: "18rem" }}>
        <Card.Img  variant='top' src={ihpones} />
        <Card.Body>
          <Card.Title> Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button bsPrefix={styles.container__button}>Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant='top' src={groceries} />
        <Card.Body>
          <Card.Title> Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button bsPrefix={styles.container__button}>Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>--
        <Card.Img variant='top' src={clothing} />
        <Card.Body>
          <Card.Title> Card Title </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button bsPrefix={styles.container__button}>Go somewhere</Button>
        </Card.Body>
      </Card>
      </Row>
    </Container>
  );
}
