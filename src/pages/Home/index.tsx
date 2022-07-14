import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Container, Carousel, Row } from "react-bootstrap";
import styles from "./Home.module.scss";
import ihpones from "assets/ihpones.jpg";
import teste from "assets/Novidades.gif";

export default function Home() {
  const [products, setProducts] = useState<Record<any, any>>();

  useEffect(() => {
    const teste = async () => {
      const { data } = await axios.get("http://localhost:8080/products");
      setProducts(data);
    };
    teste();
  }, []);

  return (
    <Container>
      <Row className={styles.carousel}>
        <Carousel>
          <Carousel.Item>
            <img src={teste} alt='' />
          </Carousel.Item>
          <Carousel.Item>
            <img src={teste} alt='' />
          </Carousel.Item>
          <Carousel.Item>
            <img src={teste} alt='' />
          </Carousel.Item>
        </Carousel>
      </Row> 
      <Row className={styles.container}>
        {products !== undefined &&
        products !== null &&
        products.content.length > 0 ? (
          products.content.map((item: any) => {
            if (item.name === "Bolo") {
              return (
                <Card style={{ width: "18rem" }} key={item.id}>
                  <Card.Img variant='top' src={ihpones} />
                  <Card.Body>
                    <Card.Title> {item.name} </Card.Title>
                    <Card.Text>
                      {item.description}${item.value}
                    </Card.Text>
                    <Button bsPrefix={styles.container__button}>
                      Check it out!
                    </Button>
                  </Card.Body>
                </Card>
              );
            }
            if (item.name === "Macarrão") {
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant='top' src={ihpones} />
                  <Card.Body>
                    <Card.Title> {item.name} </Card.Title>
                    <Card.Text>
                      {item.description}${item.value}
                    </Card.Text>
                    <Button bsPrefix={styles.container__button}>
                      Check it out!
                    </Button>
                  </Card.Body>
                </Card>
              );
            }  
            if (item.name === "Energético Monster") {
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant='top' src={ihpones} />
                  <Card.Body>
                    <Card.Title> {item.name} </Card.Title>
                    <Card.Text>
                      {item.description}${item.value}
                    </Card.Text>
                    <Button bsPrefix={styles.container__button}>
                      Check it out!
                    </Button>
                  </Card.Body>
                </Card>
              );
            }
            return null;
          })
        ) : (
          <div> coco </div>
        )}
      </Row>
    </Container>
  );
} 