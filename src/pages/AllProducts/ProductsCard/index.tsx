import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ProductsCard.module.scss";

export default function ProductsCard() {
  const [products, setProducts] = useState<Record<any, any>>();
  
  useEffect(() => {
    const teste = async () => {
      const { data } = await axios.get("http://localhost:8080/products");
      setProducts(data);
    };
    teste();
  }, []);


  const filteredProduct = products !== null && products !== undefined ? products.filter((product) => product.section.id.includes()) : null;

 
  return (
    <div className={styles.container}>
      {products !== undefined &&
        products !== null &&
        products.content.map((product) => {
          return (
            <>
              <div key={product.id}>
                <img src='' />
                <div>
                  <h1 className={styles.container__value}> {product.name} </h1>
                  <h2>{product.description}</h2>
                  <h3>{product.section.name}</h3>
                  <h1 className={styles.container__value}>${product.value}</h1>
                  <button className={styles.container__button}>
                    Check it out!
                  </button>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
}
