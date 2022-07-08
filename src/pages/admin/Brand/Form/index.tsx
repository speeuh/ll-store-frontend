import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { api } from 'services';
import { useNavigate, useParams } from 'react-router-dom';

import styles from '../../MainPageAdmin.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function BrandForm() {
  const [name, setName] = useState('');

  const token = localStorage.getItem('user');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/brands/${id}`).then((response) => setName(response.data.name));
    }
  }, [id]);

  async function handleNewBrand(e) {
    e.preventDefault();

    const data = {
      name,
    };

    if (id) {
      await api.patch(`/brands/${id}`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    } else {
      await api.post('/brands', data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    }

    navigate('/admin/brands/list');
  }

  const backOnePage = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <Button variant='outlined' onClick={backOnePage}>
          <ArrowBackIosIcon />
        </Button>
        <Form className={styles.form} onSubmit={handleNewBrand}>
          <Form.Group className='mb-3' controlId='formBasicBrandName'>
            <Form.Label> Brand Name </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicBrandSubmit'>
            <Button
              bsPrefix={styles.form__create}
              variant='primary'
              type='submit'
            >
              Save
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
