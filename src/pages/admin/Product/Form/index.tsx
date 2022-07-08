import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { api } from 'services';
import { useNavigate, useParams } from 'react-router-dom';

import styles from '../../MainPageAdmin.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [productValue, setProductValue] = useState('');
  const [expiry, setExpiry] = useState('');

  const token = localStorage.getItem('user');

  const navigate = useNavigate();

  //API
  const [sectionsListed, setSectionsListed] = useState<Record<any, any>>([]);
  const [sectionOption, setSectionOption] = useState<Record<any, any>>([]);

  const handleSection = (e) => {
    if (sectionsListed !== null && sectionsListed !== undefined) {
      setSectionOption(sectionsListed[+e.target.value]);
    }
  };

  const [brandsListed, setBrandsListed] = useState<Record<any, any>>([]);
  const [brandOption, setBrandOption] = useState<Record<any, any>>([]);

  const handleBrand = (e) => {
    if (brandsListed !== null && brandsListed !== undefined) {
      setBrandOption(brandsListed[+e.target.value]);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    const brands = async () => {
      const { data } = await api.get('/brands/list');
      setBrandsListed(data);
    };

    const sections = async () => {
      const { data } = await api.get('/sections/list');
      setSectionsListed(data);
    };

    if (id) {
      api
        .get(`/products/${id}`)
        .then((response) => [
          setName(response.data.name),
          setDescription(response.data.description),
          setProductValue(response.data.value),
        ]);
    }

    sections();
    brands();
  }, [id]);

  const [selectedFile, setSelectedFile] = useState('');

  function handleImage(e) {
    setSelectedFile(e.target.files[0]);
  }

  async function handleNewProduct(e) {
    e.preventDefault();

    const section = {
      id:
        sectionOption !== null && sectionOption !== undefined
          ? sectionOption.id
          : null,
      name:
        sectionOption !== null && sectionOption !== undefined
          ? sectionOption.name
          : null,
    };

    const brand = {
      id:
        brandOption !== null && brandOption !== undefined
          ? brandOption.id
          : null,
      name:
        brandOption !== null && brandOption !== undefined
          ? brandOption.name
          : null,
    };

    const value = Number(productValue);

    if (id) {
      const data = {
        name,
        description,
        value,
      };

      await api.patch(`/products/${id}`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    } else {
      const data = {
        name,
        section,
        brand,
        description,
        value,
        expiry,
      };

      const response = await api.post('/products', data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      let file = new FormData();
      file.append('file', selectedFile);

      await api.post(`/file/${response.data.id}`, file, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    }

    navigate('/admin/products/list');
  }

  const backOnePage = () => {
    navigate(-1);
  };

  return (
    <>
      {id === undefined ? (
        <div>
          <Button variant='outlined' onClick={backOnePage}>
            <ArrowBackIosIcon />
          </Button>
          <Form className={styles.form} onSubmit={handleNewProduct}>
            <Form.Group className='mb-3' controlId='formBasicProductName'>
              <Form.Label> Product Name </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicProductSection'>
              <Form.Label> Section </Form.Label>
              <Form.Select onChange={handleSection}>
                <option> Select a Section </option>
                {sectionsListed.map((item: any, index: any) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicProductBrand'>
              <Form.Label> Brand </Form.Label>
              <Form.Select onChange={handleBrand}>
                <option> Select a Brand </option>
                {brandsListed.map((item: any, index: any) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='formBasicProductDescription'
            >
              <Form.Label> Description </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicProductValue'>
              <Form.Label> Value </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter value'
                value={productValue}
                onChange={(e) => setProductValue(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicProductExpiry'>
              <Form.Label> Expiry </Form.Label>
              <Form.Control
                type='date'
                required
                placeholder='Enter expiry date'
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicProductImage'>
              <Form.Label> Image </Form.Label>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={handleImage}
                placeholder='Enter expiry date'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicProductSubmit'>
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
      ) : (
        <div>
          <Button variant='outlined' onClick={backOnePage}>
            <ArrowBackIosIcon />
          </Button>
          <Form className={styles.form} onSubmit={handleNewProduct}>
            <Form.Group className='mb-3' controlId='formBasicProductName'>
              <Form.Label> Product Name </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='formBasicProductDescription'
            >
              <Form.Label> Description </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicProductValue'>
              <Form.Label> Value </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter value'
                value={productValue}
                onChange={(e) => setProductValue(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicProductSubmit'>
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
      )}
    </>
  );
}
