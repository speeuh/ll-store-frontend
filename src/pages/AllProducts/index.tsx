import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from './Buttons';
import styles from './ProductsCard/ProductsCard.module.scss';

export default function AllProducts() {
  const [filteredSection, setFilteredSection] = useState<string | null>(null);
  const [products, setProducts] = useState<Record<any, any>>([]);
  const [productSectionId, setProductSectionId] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Record<any, any>>([]);

  useEffect(() => {
    const teste = async () => {
      const { data } = await axios.get('http://localhost:8080/products/list');
      setProducts(data);
      setFilteredProducts(data);
    };
    teste();
  }, []);

  useEffect(() => {
    const checkSectionId = () => {
      if (filteredSection !== null) {
        if (filteredSection === productSectionId) {
          return;
        } else {
          setFilteredProducts(products);
          const filteredProduct =
            products !== null && products !== undefined
              ? products.filter(
                  (product) => product.section.id.includes(filteredSection),
                  setProductSectionId(filteredSection)
                )
              : null;
          setFilteredProducts(filteredProduct);
        }
      }
    };

    checkSectionId();
  }, [filteredSection]);

  return (
    <div>
      <Button
        filteredSection={filteredSection}
        setFilteredSection={setFilteredSection}
      />
      <div className={styles.container}>
        {filteredProducts !== undefined &&
          filteredProducts !== null &&
          filteredProducts.map((product) => {
            return (
              <>
                <div key={product.id}>
                  <img src='' />
                  <div>
                    <h1 className={styles.container__value}>{product.name}</h1>
                    <h2>{product.description}</h2>
                    <h3>{product.section.name}</h3>
                    <h1 className={styles.container__value}>
                      ${product.value}
                    </h1>
                    <button className={styles.container__button}>
                      Check it out!
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
