import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import ihpones from "assets/ihpones.jpg";
import styles from "./AllProducts.module.scss";
import Filtros from "./Filter";



export default function AllProducts() {
  const [products, setProducts] = useState<Record<any, any>>();
  const [filtro, setFiltro] = useState<string | null>(null);
  useEffect(() => {
    const teste = async () => {
      const { data } = await axios.get("http://localhost:8080/products");
      setProducts(data);
    };
    teste();
  }, []);

  return (
    <Container className={styles.container}>
       <Filtros filtro={filtro} setFiltro={setFiltro} />
      
      {products !== undefined &&
      products !== null &&
      products.content.length > 0 ? (
        products.content.map((product) => {
          return ( 
            <>
            
            <Card style={{ width: "18rem" }} key={product.id}>
              <Card.Img variant='top' src={ihpones} />
              <Card.Body>
                <Card.Title> {product.name} </Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.section.name}</Card.Text>
                <Card.Text className={styles.container__value}>${product.value}</Card.Text>
                <Button bsPrefix={styles.container__button}>
                  Check it out!
                </Button>
              </Card.Body>
            </Card>
         
            </>
          );
        })
      ) : (
        <div> coco </div>
      )}
    </Container>
  );
}
