import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import IProduct from 'interfaces/IProduct';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { api } from 'services';

import styles from '../../MainPageAdmin.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductList() {
  const [products, setProducts] = useState<Record<any, any>>([]);
  const token = localStorage.getItem('user');

  useEffect(() => {
    api.get('/products/list').then((response) => setProducts(response.data));
  }, []);

  const deleteProduct = async (deleteProduct: IProduct) => {
    await api
      .delete(`/products/${deleteProduct.id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        const productsList = products.filter(
          (product) => product.id !== deleteProduct.id
        );
        setProducts([...productsList]);
      });
  };

  return (
    <TableContainer component={Paper}>
      <h1 className={styles.title}> Products List </h1>
      <div className={styles.links}>
        <Link to={'/admin/products/new'}>
          <Button
            className={styles.links__button}
            variant='contained'
            color='success'
          >
            New Product
          </Button>
        </Link>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            const expiryFormated = moment(product.expiry).format('DD-MM-yyyy');
            return (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.section.name}</TableCell>
                <TableCell>{product.brand.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.value}</TableCell>
                <TableCell>{expiryFormated}</TableCell>
                <TableCell className={styles.links}>
                  <Link to={`/admin/products/${product.id}`}>
                    <Button variant='contained' color='info'>
                      Edit
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => deleteProduct(product)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
