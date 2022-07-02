import HomeIcon from '@mui/icons-material/Home';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon />,
    },
    {
        title: 'Products',
        path: '/admin/products/list',
        icon: <AddBusinessIcon />,
    },
    {
        title: 'Sections',
        path: '/admin/sections/list',
        icon: <AddBusinessIcon />,
    },
    {
        title: 'Brands',
        path: '/admin/brands/list',
        icon: <AddBusinessIcon />,
    }
]