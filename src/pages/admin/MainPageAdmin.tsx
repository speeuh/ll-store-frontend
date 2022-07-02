import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import styles from './MainPageAdmin.module.scss';
import TemporaryDrawer from 'components/Header/TemporaryDrawer';
import { Container, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function MenuAppBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' className={styles.app}>
          <Toolbar>
            <TemporaryDrawer />
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Admin
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

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
