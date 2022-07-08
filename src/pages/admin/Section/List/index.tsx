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

export default function SectionList() {
  const [sections, setSections] = useState<Record<any, any>>([]);
  const token = localStorage.getItem('user');

  useEffect(() => {
    api.get('/sections/list').then((response) => setSections(response.data));
  }, []);

  const deleteSection = async (deleteSection: IProduct) => {
    await api
      .delete(`/sections/${deleteSection.id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        const sectionsList = sections.filter(
          (section) => section.id !== deleteSection.id
        );
        setSections([...sectionsList]);
      });
  };

  return (
    <TableContainer component={Paper}>
      <h1 className={styles.title}> Sections List </h1>
      <div className={styles.links}>
        <Link to={'/admin/sections/new'}>
          <Button
            className={styles.links__button}
            variant='contained'
            color='success'
          >
            New Section
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
          {sections.map((section) => {
            return (
              <TableRow key={section.id}>
                <TableCell>{section.name}</TableCell>
                <TableCell className={styles.links}>
                  <Link to={`/admin/sections/${section.id}`}>
                    <Button variant='contained' color='info'>
                      Edit
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => deleteSection(section)}
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
