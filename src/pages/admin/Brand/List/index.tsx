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
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { api } from 'services';

import styles from '../../MainPageAdmin.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BrandList() {
  const [brands, setBrands] = useState<Record<any, any>>([]);
  const token = localStorage.getItem('user');

  useEffect(() => {
    api.get('/brands/list').then((response) => setBrands(response.data));
  }, []);

  const deleteBrand = async (deleteBrand: IProduct) => {
    await api
      .delete(`/brands/${deleteBrand.id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        const brandsList = brands.filter(
          (brand) => brand.id !== deleteBrand.id
        );
        setBrands([...brandsList]);
      });
  };

  return (
    <TableContainer component={Paper}>
      <div className={styles.links}>
        <Link to={'/admin/brands/new'}>
          <Button className={styles.links__button} variant='contained' color='success'>
            New Brand
          </Button>
        </Link>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand) => {
            return (
              <TableRow key={brand.id}>
                <TableCell>{brand.name}</TableCell>
                <TableCell className={styles.links}>
                  <Link to={`/admin/brands/${brand.id}`}>
                    <Button variant='contained' color='info'>
                      Edit
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => deleteBrand(brand)}
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
