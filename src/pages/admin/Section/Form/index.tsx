import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { api } from 'services';
import { useNavigate } from 'react-router-dom';

import styles from '../../MainPageAdmin.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function SectionForm() {
  const [name, setName] = useState('');

  const token = localStorage.getItem('user');

  const navigate = useNavigate();

  async function handleNewSection(e) {
    e.preventDefault();

    const data = {
      name,
    };

    await api.post('/sections', data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    navigate('/admin/sections/list');
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
        <Form className={styles.form} onSubmit={handleNewSection}>
          <Form.Group className='mb-3' controlId='formBasicSectionName'>
            <Form.Label> Section Name </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter section name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicSectionSubmit'>
            <Button
              bsPrefix={styles.form__create}
              variant='primary'
              type='submit'
            >
              Create
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
