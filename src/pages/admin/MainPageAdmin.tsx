import {
    AppBar,
    Box,
    Button,
    Link,
    Paper,
    Toolbar,
    Typography,
    Container,
  } from '@mui/material';
  
  import { Link as RouterLink, Outlet } from 'react-router-dom';
  
  export default function MainPageAdmin() {
    return (
      <>
        <AppBar position='static'>
          <Container maxWidth='xl'>
            <Toolbar>
              <Typography variant='h6'>Admin</Typography>
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Link component={RouterLink} to='/admin/products'>
                  <Button sx={{ my: 2, color: 'white' }}>Products</Button>
                </Link>
                <Link component={RouterLink} to='/admin/products/new'>
                  <Button sx={{ my: 2, color: 'white' }}>New Product</Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
  
        <Box>
          <Container maxWidth='lg' sx={{ mt: 1 }}>
            <Paper sx={{ p: 2 }}>
              <Outlet />
            </Paper>
          </Container>
        </Box>
      </>
    );
  }
  